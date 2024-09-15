"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ButtonLoading } from "@/components/ui/button-loading";
import { createSite } from "@/server/actions/create-site";

const schema = z.object({
  title: z.string().min(1),
  subdomain: z.string().min(1),
});

export default function SiteForm() {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { title: "", subdomain: "" },
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof schema>) {
    const res = await createSite(data);

    if (!res.success) {
      toast({
        title: "Error creating site",
        description: res.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Site created successfully",
      description: res.message,
    });
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter site title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subdomain</FormLabel>
              <FormControl>
                <Input placeholder="Enter site subdomain" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          {form.formState.isSubmitting ? (
            <ButtonLoading>Creating...</ButtonLoading>
          ) : (
            <Button type="submit">Create Site</Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}