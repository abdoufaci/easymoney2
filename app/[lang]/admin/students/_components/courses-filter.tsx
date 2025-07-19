"use client";

import { Check, ChevronDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleSelect = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full max-w-[140px] justify-between text-left font-normal border border-[#B9BEC7] bg-transparent text-white",
            className
          )}
          onClick={() => setOpen(!open)}>
          <div className="flex  flex-wrap">
            {selected.length > 0 ? (
              <h1>{selected.length} courses</h1>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface Props {
  courses: { label: string; value: string }[];
}

export default function CoursesFilter({ courses }: Props) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const joinDateFrom = searchParams.get("joinDateFrom");
  const joinDateTo = searchParams.get("joinDateTo");
  const country = searchParams.get("country");
  const status = searchParams.get("status");
  const dateOfBirthFrom = searchParams.get("dateOfBirthFrom");
  const dateOfBirthTo = searchParams.get("dateOfBirthTo");

  useEffect(() => {
    if (!!selectedCourses.length) {
      const url = qs.stringifyUrl(
        {
          url: "/admin/students",
          query: {
            page: page === "1" ? null : page,
            search,
            joinDateFrom,
            joinDateTo,
            dateOfBirthFrom,
            dateOfBirthTo,
            country,
            status,
            courses: selectedCourses.join(","),
          },
        },
        { skipNull: true }
      );
      router.push(url);
    } else {
      const url = qs.stringifyUrl(
        {
          url: "/admin/students",
          query: {
            page: page === "1" ? null : page,
            search,
            joinDateFrom,
            joinDateTo,
            dateOfBirthFrom,
            dateOfBirthTo,
            country,
            status,
          },
        },
        { skipNull: true }
      );
      router.push(url);
    }
  }, [selectedCourses]);

  return (
    <MultiSelect
      options={courses}
      selected={selectedCourses}
      onChange={setSelectedCourses}
      placeholder="courses..."
    />
  );
}
