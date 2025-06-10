"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  dict: any;
}

function StudentSearch({ dict }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!debouncedSearchTerm) {
      router.push(`${pathname}${page ? `?page=${page}` : ""}`);
      return;
    } else {
      router.push(`${pathname}?search=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        className="pl-10 border-[#B9BEC7] rounded-full w-64 text-sm"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.currentTarget.value);
        }}
      />
    </div>
  );
}

export default StudentSearch;
