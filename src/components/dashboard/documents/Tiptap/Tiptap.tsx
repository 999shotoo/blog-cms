import React from "react";
import "./styles/styles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import TiptapToolbar from "./TiptapToolbar";
import TiptapBubbleMenu from "./TiptapBubbleMenu";

export default function Tiptap({
  content,
  onChange,
}: {
  content: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Link.configure({
        protocols: ["https", "mailto"],
      }),
      Underline,
      TextAlign.configure({
        alignments: ["left", "right", "center"],
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder:
          "Type something... Highlight your text to format it or use the toolbar above.",
        emptyEditorClass: "is-editor-empty",
      }),
      Image,
    ],
    editorProps: {
      attributes: {
        class:
          "rounded-md min-h-[400px] border border-input bg-transparent p-2.5 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    content: content,
  });

  return (
    <div className="space-y-2 ">
      <TiptapToolbar editor={editor} />
      <TiptapBubbleMenu editor={editor} />
      <EditorContent className="tiptap" editor={editor} />
    </div>
  );
}
