"use client";

import React from "react";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { createAuthor } from "@/server/actions/create-author";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  bio: z.string().min(1).optional(),
});

export default function AuthorForm({ siteId }: { siteId: string }) {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { name: "" },
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof schema>) {
    const res = await createAuthor({ ...data, siteId });

    if (!res.success) {
      toast({
        title: "Error creating author",
        description: res.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Author created successfully",
      description: res.message,
    });
    form.reset();
    return;
  }

  return (
    <div className="w-3/4 mx-auto">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter author bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.isSubmitting ? (
            <ButtonLoading>Creating...</ButtonLoading>
          ) : (
            <Button type="submit">Create Author</Button>
          )}
        </form>
      </Form>
    </div>
  );
}
