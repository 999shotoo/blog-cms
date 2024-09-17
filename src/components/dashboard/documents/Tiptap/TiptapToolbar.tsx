"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type Editor } from "@tiptap/react";
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  CodeIcon,
  Link2Icon,
  ListOrderedIcon,
  ListIcon,
  ImagePlusIcon,
  QuoteIcon,
  DivideIcon,
} from "lucide-react";
import React from "react";
import { type ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";

export default function TiptapToolbar(props: { editor: Editor | null }) {
  if (!props.editor) {
    return null;
  }

  const setLink = React.useCallback(() => {
    const previousUrl = props.editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      props.editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    props.editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [props.editor]);

  return (
    <div className="flex w-fit items-center gap-2 rounded-md border border-input bg-background px-2 py-0.5">
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() =>
          props.editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`${
          props.editor?.isActive("heading", { level: 1 })
            ? "h-full bg-muted"
            : ""
        }  w-full rounded-md px-3 py-2`}
      >
        <Heading1Icon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() =>
          props.editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`${
          props.editor?.isActive("heading", { level: 2 })
            ? "h-full bg-muted"
            : ""
        }  w-full rounded-md px-3 py-2`}
      >
        <Heading2Icon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() =>
          props.editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={`${
          props.editor?.isActive("heading", { level: 3 })
            ? "h-full bg-muted"
            : ""
        }  w-full rounded-md px-3 py-2`}
      >
        <Heading3Icon className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" />
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() => props.editor?.chain().focus().toggleBulletList().run()}
        className={`${
          props.editor?.isActive("bulletList") ? "h-full bg-muted" : ""
        }  w-full rounded-md px-3 py-2`}
      >
        <ListIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() => props.editor?.chain().focus().toggleOrderedList().run()}
        className={`${
          props.editor?.isActive("orderedList") ? "h-full bg-muted" : ""
        }  w-full rounded-md px-3 py-2`}
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" />
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() => props.editor?.chain().focus().toggleCodeBlock().run()}
        className={`${
          props.editor?.isActive("codeBlock") ? "h-full bg-muted" : ""
        }  w-full rounded-md px-3 py-2`}
      >
        <CodeIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={setLink}
        className={`${
          props.editor?.isActive("link") ? "h-full bg-muted" : ""
        }  w-full rounded-md px-3 py-2`}
      >
        <Link2Icon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() => props.editor?.chain().focus().toggleBlockquote().run()}
        className={`${
          props.editor?.isActive("blockquote") ? "h-full bg-muted" : ""
        }  w-full rounded-md px-3 py-2`}
      >
        <QuoteIcon className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            const imageUrl = res[0].url;
            props.editor?.chain().focus().setImage({ src: imageUrl }).run();
          }
        }}
        onUploadError={(error: Error) => {
          console.error(error);
          alert(`Upload failed: ${error.message}`);
        }}
      />
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() => props.editor?.chain().focus().setHardBreak().run()}
        className="h-full w-full rounded-md px-3 py-2 hover:bg-muted"
      >
        <DivideIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
