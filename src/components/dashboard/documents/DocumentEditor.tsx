"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Tiptap from "./Tiptap/Tiptap";
import { updateDocument } from "@/server/actions/update-document";

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export default function DocumentEditor({
  document,
}: {
  document: { id: string; title: string; content: string | null };
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      title: document.title,
      content: document.content ?? "",
    },
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof schema>) {
    const res = await updateDocument({
      documentId: document.id,
      title: data.title,
      content: data.content,
    });

    if (!res.success) {
      toast({
        title: "Error updating document",
        description: res.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Document updated successfully",
      description: res.message,
    });
    router.push(`/dashboard/${res.data?.siteId}/documents`);
    return;
  }

  return (
    <div className="flex flex-col justify-center w-3/4 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the title of your document"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Tiptap content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.isSubmitting ? (
            <ButtonLoading>Updating...</ButtonLoading>
          ) : (
            <Button>Update</Button>
          )}
        </form>
      </Form>
    </div>
  );
}
