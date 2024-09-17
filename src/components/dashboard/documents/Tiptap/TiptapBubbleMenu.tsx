import React from "react";
import { BubbleMenu, type Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TiptapBubbleMenu(props: { editor: Editor | null }) {
  if (!props.editor) {
    return null;
  }

  return (
    <BubbleMenu editor={props.editor} tippyOptions={{ duration: 100 }}>
      <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2 py-0.5">
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => props.editor?.chain().focus().toggleBold().run()}
          className={`${
            props.editor?.isActive("bold") ? "h-full bg-muted" : ""
          }  w-full rounded-md px-3 py-2`}
        >
          <BoldIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => props.editor?.chain().focus().toggleItalic().run()}
          className={`${
            props.editor?.isActive("italic") ? "h-full bg-muted" : ""
          }  w-full rounded-md px-3 py-2`}
        >
          <ItalicIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => props.editor?.chain().focus().toggleStrike().run()}
          className={`${
            props.editor?.isActive("strike") ? "h-full bg-muted" : ""
          }  w-full rounded-md px-3 py-2`}
        >
          <StrikethroughIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => props.editor?.chain().focus().toggleUnderline().run()}
          className={`${
            props.editor?.isActive("underline") ? "h-full bg-muted" : ""
          }  w-full rounded-md px-3 py-2`}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => props.editor?.commands.setTextAlign("left")}
          className={`${
            props.editor?.isActive({ textAlign: "left" })
              ? "h-full bg-muted"
              : ""
          }  w-full rounded-md px-3 py-2`}
        >
          <AlignLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => props.editor?.commands.setTextAlign("center")}
          className={`${
            props.editor?.isActive({ textAlign: "center" })
              ? "h-full bg-muted"
              : ""
          }  w-full rounded-md px-3 py-2`}
        >
          <AlignCenterIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => props.editor?.commands.setTextAlign("right")}
          className={`${
            props.editor?.isActive({ textAlign: "right" })
              ? "h-full bg-muted"
              : ""
          }  w-full rounded-md px-3 py-2`}
        >
          <AlignRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </BubbleMenu>
  );
}
