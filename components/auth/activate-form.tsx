"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ActivateSchema } from "@/schemas";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/backend/auth-actions/login";
import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AvatarImageUpload } from "../avatar-upload";
import { activateAccount } from "@/backend/auth-actions/activate-account";

interface Props {
  dict: any;
}

export function ActivateForm({ dict }: Props) {
  const pathname = usePathname();
  const pathParts = pathname?.split("/").filter(Boolean);
  const local = pathParts?.[0];
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+44",
    flag: "🇬🇧",
    name: "United Kingdom",
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
      activateAccount(data, selectedCountry)
        .then(() => {
          toast.success("Success");
          router.push("/dashboard");
        })
        .catch(() => toast.error("Something went wrong."));
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
                      <AvatarImageUpload
                        //@ts-ignore
                        value={field.value}
                        onChange={field.onChange}
                        endpoint="logoUploader"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"whiteOutline"}
                          size={"xl"}
                          className={cn(
                            "w-full pl-5 text-left font-normal rounded-full flex items-center justify-start"
                          )}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>{dict?.auth.dateOfBirth}</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.country}
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 pl-5 rounded-full"
                    />
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
                              .map((country) => (
                                <DropdownMenuItem
                                  key={country.code}
                                  onClick={() => setSelectedCountry(country)}
                                  className="cursor-pointer">
                                  <span>{country.name}</span>
                                  <span className="ml-auto text-muted-foreground">
                                    {country.code}
                                  </span>
                                </DropdownMenuItem>
                              ))}
                          </ScrollArea>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Input
                        type="tel"
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
