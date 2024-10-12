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
import { Textarea } from "@/components/ui/textarea";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Box } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  subdomain: z.string().min(1),
  url: z.string().url(),
  imageUrl: z.string().url().optional(),
});

export default function SiteForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { title: "", subdomain: "" },
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  const onUploadComplete = React.useCallback(
    (res: any[]) => {
      if (res && res.length > 0 && res[0].url) {
        const fileUrl = res[0].url;
        form.setValue("imageUrl", fileUrl);
        toast({
          title: "Upload Completed",
          description: "Image URL has been saved to the form.",
        });
      } else {
        toast({
          title: "Upload Error",
          description: "Failed to get the image URL from the upload response.",
          variant: "destructive",
        });
      }
    },
    [form, toast]
  );

  const onUploadError = React.useCallback(
    (error: Error) => {
      toast({
        title: "Error",
        description: `Upload failed: ${error.message}`,
        variant: "destructive",
      });
    },
    [toast]
  );

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
    setOpen(false);
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ScrollArea className="h-[calc(100vh-200px)] ">
          <div className="space-y-4 px-4">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter site description..."
                      {...field}
                    />
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
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter site url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={onUploadComplete}
                        onUploadError={onUploadError}
                        appearance={{
                          uploadIcon: {
                            width: 42,
                            height: 42,
                            padding: 4,
                          },
                        }}
                      />
                      <Input
                        {...field}
                        placeholder="Image URL will appear here"
                        readOnly
                        disabled
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating..." : "Create Site"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
