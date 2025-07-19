"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  joinDate: z
    .object({
      from: z.date({
        required_error: "A date of birth is required.",
      }),
      to: z.date({
        required_error: "A date of birth is required.",
      }),
    })
    .optional(),
});

export function StudentJoinDate() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const dateOfBirthFrom = searchParams.get("dateOfBirthFrom");
  const dateOfBirthTo = searchParams.get("dateOfBirthTo");
  const country = searchParams.get("country");
  const status = searchParams.get("status");
  const courses = searchParams.get("courses");

  const joinDate = form.watch("joinDate");

  useEffect(() => {
    if (joinDate) {
      form.handleSubmit(onSubmit)();
    }
  }, [joinDate, form.handleSubmit]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const url = qs.stringifyUrl(
      {
        url: "/admin/students",
        query: {
          page: page === "1" ? null : page,
          search,
          joinDateFrom: data.joinDate?.from.toString(),
          joinDateTo: data.joinDate?.to.toString(),
          dateOfBirthFrom,
          dateOfBirthTo,
          country,
          status,
          courses,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  }

  const handleReset = () => {
    form.setValue("joinDate", undefined);
    const url = qs.stringifyUrl(
      {
        url: "/admin/students",
        query: {
          page: page === "1" ? null : page,
          search,
          dateOfBirthFrom,
          dateOfBirthTo,
          country,
          status,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="joinDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full max-w-[240px] pl-3 text-left font-normal border border-[#B9BEC7] bg-transparent text-white",
                        !field.value && "text-muted-foreground"
                      )}>
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span className="text-white">Join date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-white" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field?.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                  <div className="px-4 pb-4">
                    <Button
                      disabled={!field.value?.from && !field.value?.to}
                      size={"sm"}
                      className="w-full"
                      onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
