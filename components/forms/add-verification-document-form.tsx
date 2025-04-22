"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { addSection } from "@/backend/mutations/section/add-section";
import { toast } from "sonner";
import { useModal } from "@/hooks/useModalStore";
import { VerificationDocumentsSchema } from "@/schemas";
import { VerificationDocumentImageUpload } from "../document-image-upload";
import { addDocuments } from "@/backend/mutations/users/add-documents";

export function AddVerificationDocumentForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, data } = useModal();

  const dict = data?.dict;

  const form = useForm<z.infer<typeof VerificationDocumentsSchema>>({
    resolver: zodResolver(VerificationDocumentsSchema),
  });

  const onSubmit = (data: z.infer<typeof VerificationDocumentsSchema>) => {
    startTransition(() => {
      addDocuments(data)
        .then(() => {
          toast.success("Documents added");
          onClose();
        })
        .catch(() => toast.error("Something went wrong, try again."));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 text-white">
          <FormField
            control={form.control}
            name="document1"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center items-center gap-3 w-full relative">
                    <VerificationDocumentImageUpload
                      //@ts-ignore
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="logoUploader"
                      src="/upload-document-1.svg"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="document2"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center items-center gap-3 w-full relative">
                    <VerificationDocumentImageUpload
                      //@ts-ignore
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="logoUploader"
                      src="/upload-document-2.svg"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h1 className="text-xs">
          {dict?.general.termsAndConditions}{" "}
          <span className="underline font-medium cursor-pointer">
            {dict?.general.termsCTA}
          </span>
        </h1>
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
  );
}
