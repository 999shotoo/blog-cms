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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TagInput, Tag } from "emblor";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { publishArticle } from "@/server/actions/publish-article";
import { UploadDropzone } from "@/lib/uploadthing";

const schema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1).optional(),
  slug: z.string().min(1),
  keywords: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  imageUrl: z.string().url().optional(),
  documentId: z.string().min(1),
  categoryId: z.string().min(1),
  authorId: z.string().min(1),
});

export default function PublishForm({
  siteId,
  categories,
  authors,
  documents,
}: {
  siteId: string;
  categories: { id: string; name: string }[];
  authors: { id: string; name: string }[];
  documents: { id: string; title: string }[];
}) {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      title: "",
      subtitle: "",
      slug: "",
      keywords: [],
      documentId: "",
      categoryId: "",
      authorId: "",
    },
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null
  );
  const { watch, setValue } = form;

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple dashes with a single dash
      .replace(/^-+/, "") // Trim dashes from the start
      .replace(/-+$/, ""); // Trim dashes from the end
  };

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

  // Watch the title field and update slug accordingly
  const title = watch("title");

  React.useEffect(() => {
    if (title) {
      setValue("slug", slugify(title));
    }
  }, [title, setValue]);

  async function onSubmit(data: z.infer<typeof schema>) {
    const res = await publishArticle({
      ...data,
      keywords: data.keywords.map((keyword) => keyword.text),
      siteId,
    });

    if (!res.success) {
      toast({
        title: "Error publishing",
        description: res.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Published successfully",
      description: "Your article is published",
    });
    form.reset();
    return;
  }

  return (
    <div className="w-3/4 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Subtitle</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subtitle" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">keywords</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Enter a list of keywords"
                    tags={tags}
                    setTags={(newTags) => {
                      setTags(newTags);
                      form.setValue("keywords", newTags as [Tag, ...Tag[]]);
                    }}
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorId"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Author</FormLabel>
                <Select
                  disabled={authors.length === 0}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          authors.length === 0
                            ? "Please create an author"
                            : "Select an author"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        {author.name}
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={categories.length === 0}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          categories.length === 0
                            ? "Please create a category"
                            : "Select a category"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
            name="documentId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={documents.length === 0}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          documents.length === 0
                            ? "Please create a document"
                            : "Select a document"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {documents.map((document) => (
                      <SelectItem key={document.id} value={document.id}>
                        {document.title}
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="col-span-2">
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

          <div className="w-fit">
            {form.formState.isSubmitting ? (
              <ButtonLoading>Publishing...</ButtonLoading>
            ) : (
              <Button type="submit">Publish</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
