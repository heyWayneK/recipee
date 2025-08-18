"use client";
import React from "react";
// For v2, BubbleMenu is imported directly from @tiptap/react
import { useEditor, EditorContent, useEditorState, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/core";

import "./TiptapStyles.css"; // Import the v2 CSS file

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

// The MenuBar component with all the controls
function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold") ?? false,
      canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor.isActive("italic") ?? false,
      canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
      isStrike: ctx.editor.isActive("strike") ?? false,
      canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
      isCode: ctx.editor.isActive("code") ?? false,
      canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
      isParagraph: ctx.editor.isActive("paragraph") ?? false,
      isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
      isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
      isBulletList: ctx.editor.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor.isActive("orderedList") ?? false,
      isBlockquote: ctx.editor.isActive("blockquote") ?? false,
    }),
  });

  return (
    <div className="button-group">
      <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editorState.canBold} className={editorState.isBold ? "is-active" : ""}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editorState.canItalic} className={editorState.isItalic ? "is-active" : ""}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editorState.canStrike} className={editorState.isStrike ? "is-active" : ""}>
        Strike
      </button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editorState.canCode} className={editorState.isCode ? "is-active" : ""}>
        Code
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editorState.isParagraph ? "is-active" : ""}>
        Paragraph
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editorState.isHeading1 ? "is-active" : ""}>
        H1
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editorState.isHeading2 ? "is-active" : ""}>
        H2
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editorState.isHeading3 ? "is-active" : ""}>
        H3
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editorState.isBulletList ? "is-active" : ""}>
        Bullet list
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editorState.isOrderedList ? "is-active" : ""}>
        Ordered list
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editorState.isBlockquote ? "is-active" : ""}>
        Blockquote
      </button>
    </div>
  );
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    immediatelyRender: false, // Correct for SSR environments like Next.js
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  // This prevents rendering errors on the server by waiting for the editor to initialize
  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-container">
      {/* The BubbleMenu is a component in v2, rendered directly in the JSX */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100, placement: "top" }}>
        <div className="bubble-menu">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is-active" : ""}>
            Bold
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "is-active" : ""}>
            Italic
          </button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "is-active" : ""}>
            Strike
          </button>
        </div>
      </BubbleMenu>

      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
