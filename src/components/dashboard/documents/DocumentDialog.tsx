"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { ButtonLoading } from "@/components/ui/button-loading";
import { useToast } from "@/hooks/use-toast";
import { createDocument } from "@/server/actions/create-document";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(1),
});

export default function DocumentDialog({ siteId }: { siteId: string }) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { title: "" },
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof schema>) {
    const res = await createDocument({ ...data, siteId });

    if (res.success) {
      toast({
        title: "Document created successfully",
        description: res.message,
      });
      setOpen(false);
      router.push(`/dashboard/${siteId}/documents/${res.data.documentId}/edit`);
      return;
    }

    toast({
      title: "Error creating document",
      description: res.message,
      variant: "destructive",
    });
    return;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="ms-auto">
          Create Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
          <DialogDescription>
            Create a new document to publish an article
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter document title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {form.formState.isSubmitting ? (
                <ButtonLoading>Creating...</ButtonLoading>
              ) : (
                <Button type="submit">Create Document</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
