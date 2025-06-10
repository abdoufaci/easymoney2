"use client";

import { useQuery } from "@tanstack/react-query";
import qs from "query-string";

export const useAllStudentsQuery = () => {
  const fetchAllStudents = async () => {
    const url = qs.stringifyUrl(
      {
        url: "/api/students",
      },
      { skipNull: true }
    );
    const res = await fetch(url);
    return res.json();
  };
  const { data, isPending, refetch } = useQuery({
    queryKey: ["all-students"],
    queryFn: () => fetchAllStudents(),
  });

  return { data, isPending, refetch };
};
