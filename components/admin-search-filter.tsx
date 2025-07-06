"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface Props {
  dict: any;
  url: string;
}

function AdminSearchFilter({ url: pathname }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const joinDateFrom = searchParams.get("joinDateFrom");
  const joinDateTo = searchParams.get("joinDateTo");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const dateOfBirthFrom = searchParams.get("dateOfBirthFrom");
  const dateOfBirthTo = searchParams.get("dateOfBirthTo");
  const country = searchParams.get("country");
  const status = searchParams.get("status");
  const price = searchParams.get("price");

  const router = useRouter();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          page: page === "1" ? null : page,
          search: debouncedSearchTerm === "" ? null : debouncedSearchTerm,
          joinDateFrom,
          joinDateTo,
          dateOfBirthFrom,
          dateOfBirthTo,
          country,
          status,
          dateFrom,
          dateTo,
          price,
        },
      },
      { skipNull: true }
    );
    router.push(url);
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

export default AdminSearchFilter;
