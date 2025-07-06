"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ActivateSchema } from "@/schemas";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { countryCodes } from "@/constants/country-codes";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";
import { activateAccount } from "@/backend/auth-actions/activate-account";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { months } from "@/constants/months";
import { years } from "@/constants/years";
import EverythingUploader from "../everything-uploader";
import { ExtendedUser } from "@/types/next-auth";
import { countries } from "countries-list";

interface Props {
  dict: any;
  user?: ExtendedUser;
}

export function ActivateForm({ dict, user }: Props) {
  const pathname = usePathname();
  const pathParts = pathname?.split("/").filter(Boolean);
  const local = pathParts?.[0];
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+213",
    flag: "🇩🇿",
    name: "Algeria (‫الجزائر‬‎)",
  });

  const redirectUrl = searchParams?.get("redirectUrl");
  const urlError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ActivateSchema>>({
    resolver: zodResolver(ActivateSchema),
  });

  const onSubmit = (data: z.infer<typeof ActivateSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      activateAccount(data, selectedCountry, user)
        .then(() => {
          toast.success("Success");
          router.push("/dashboard");
        })
        .catch((err) => {
          console.log({
            err,
            data,
          });
          toast.error("Something went wrong.");
        });
    });
  };

  return (
    <CardWrapper
      mainHeaderLabel={dict.auth.activateTitle}
      headerLabel={""}
      isActivate>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 text-white">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-center items-center gap-3 w-full relative">
                      <EverythingUploader
                        value={form.watch("image")}
                        onChange={field.onChange}
                        setImageToDelete={() => {}}
                        settings
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mounted && (
              <div className="grid grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 place-items-center gap-2 w-full">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <Select
                        key={"year"}
                        value={field.value}
                        onValueChange={(year) => field.onChange(year)}>
                        <SelectTrigger className="w-full py-5 rounded-full bg-transparent border border-white placeholder:text-white">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                          {years.map((year) => (
                            <SelectItem key={year} value={`${year}`}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <Select
                        key={"month"}
                        value={field.value}
                        onValueChange={(month) => field.onChange(month)}>
                        <SelectTrigger className="w-full py-5 rounded-full bg-transparent border border-white placeholder:text-white">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem
                              key={month.value}
                              value={`${month.value}`}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <Select
                        key={"day"}
                        value={field.value}
                        onValueChange={(day) => field.onChange(day)}>
                        <SelectTrigger className="w-full py-5 rounded-full bg-transparent border border-white placeholder:text-white">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (day) => (
                              <SelectItem key={day} value={`${day}`}>
                                {day}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      key={"country"}
                      value={field.value}
                      onValueChange={(country) => field.onChange(country)}>
                      <SelectTrigger className="w-full py-5 rounded-full bg-transparent border border-white placeholder:text-white">
                        <SelectValue
                          placeholder={dict.auth.country}
                          className="placeholder:text-white"
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        {Object.values(countries)
                          .map((country) => country.name)
                          .sort((a, b) => a.localeCompare(b))
                          .map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.city}
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.adress}
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.zipCode}
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mounted && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex items-center gap-1 w-[110px] justify-between border-white border-[0.54px] 
                            text-white placeholder:text-white py-6 pl-5 rounded-full bg-transparent">
                              <span>{selectedCountry.code}</span>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="w-[200px]">
                            <ScrollArea className="h-52">
                              {countryCodes
                                .sort(
                                  (a, b) =>
                                    Number(a.code.slice(1)) -
                                    Number(b.code.slice(1))
                                )
                                .map((country) => {
                                  if (country.code === "+213") {
                                    console.log({
                                      country,
                                    });
                                  }
                                  return (
                                    <DropdownMenuItem
                                      key={country.code}
                                      onClick={() =>
                                        setSelectedCountry(country)
                                      }
                                      className="cursor-pointer">
                                      <span>{country.name}</span>
                                      <span className="ml-auto text-muted-foreground">
                                        {country.code}
                                      </span>
                                    </DropdownMenuItem>
                                  );
                                })}
                            </ScrollArea>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Input
                          type="number"
                          placeholder={dict.auth.phoneNumber}
                          className="border-white border text-white placeholder:text-white py-6 pl-5 rounded-full flex-1"
                          {...field}
                          disabled={isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            variant={"white"}
            type="submit"
            disabled={isPending}
            size={"lg"}
            className="w-full rounded-full">
            Done
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
