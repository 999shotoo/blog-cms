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
import { createCategory } from "@/server/actions/create-category";

const schema = z.object({
  name: z.string().min(1),
});

export default function CategoryForm({ siteId }: { siteId: string }) {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { name: "" },
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof schema>) {
    const res = await createCategory({...data, siteId});

    if (!res.success) {
      toast({
        title: "Error creating category",
        description: res.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Category created successfully",
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
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.isSubmitting ? (
            <ButtonLoading>Creating...</ButtonLoading>
          ) : (
            <Button type="submit">Create Category</Button>
          )}
        </form>
      </Form>
    </div>
  );
}
