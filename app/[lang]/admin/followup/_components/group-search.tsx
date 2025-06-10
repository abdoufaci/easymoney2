"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useRouter } from "next/navigation";

function GroupSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!debouncedSearchTerm) {
      router.push(pathname);
    } else {
      router.push(`${pathname}?search=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#B9BEC7] h-4 w-4" />
      <Input
        className="pl-12 border-[#B9BEC7] rounded-full w-full text-sm py-5"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.currentTarget.value);
        }}
      />
    </div>
  );
}

export default GroupSearch;
