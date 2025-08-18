import React, { useEffect, useRef, useState } from "react";
import SvgSprite from "@/components/SvgSprite";
import { useRecipeData } from "@/contexts/useRecipeData";
import DOMPurify from "dompurify";
import TiptapEditor from "./TiptapEditor";
import { set } from "cypress/types/lodash";
import Pill from "./Pill";

interface TextEditableProps {
  path: string; //
}

/* INFO: OLD TYPESCRIPT to validate text path
const TextEditable = <P extends PathString>({ initialTextObject, onSave, className }: TextEditableProps<P>) => {
const [path, value] = Object.entries(initialTextObject)[0] as [P, PathValue<PreCalculatedRecipeData, P>]; */
const TextEditable = ({ path }: TextEditableProps) => {
  const { recipeData, getRecipeDataByPath, setRecipeDataByPath } = useRecipeData();

  const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    // Initialize text with the value from initialTextObject
    // Sanitize the HTML before rendering to prevent XSS attacks
    const initialValue = getRecipeDataByPath(path, recipeData);
    const sanitizedText = DOMPurify.sanitize(initialValue ? String(initialValue) : "");
    setText(sanitizedText);
  }, [path, getRecipeDataByPath, recipeData]);

  // Function to switch to edit mode
  const handleEdit = () => {
    setEditing(true);
    setTimeout(() => {
      const editorElement = document.querySelector(".tiptap-editor"); // Ensure this matches the actual class of your Tiptap editor
      if (editorElement) {
        (editorElement as HTMLElement).focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(editorElement);
        selection?.removeAllRanges();
        selection?.addRange(range);
      } else {
        console.error("Editor element not found");
      }
    }, 0);
  };

  // Function to save text and switch back to view mode
  const handleSave = () => {
    if (!text.trim()) {
      // if Empty
      return;
    }
    if (text !== getRecipeDataByPath(path, recipeData)) {
      // if text has changed
      setRecipeDataByPath(path, text, recipeData);
    }
    handleClose();
  };

  const handleTiptapChange = (content: string) => {
    setText(content);
  };

  const handleClose = () => {
    // Reset text to the original value from recipeData incase deleted or changed
    setText(getRecipeDataByPath(path, recipeData)); // Reset text if no changes
    setEditing(false);
  };

  return (
    <div className={`relative`} ref={wrapperRef}>
      {editing ? (
        <div>
          <TiptapEditor content={text} onChange={handleTiptapChange} />

          <div className="flex gap-3 p-2">
            <Pill className="text-xs" iconName="save" tone="dark" onClick={handleSave}>
              Save
            </Pill>
            <Pill className="text-xs" iconName="close" tone="clear" onClick={handleClose}>
              Cancel
            </Pill>
          </div>
        </div>
      ) : (
        <div onClick={handleEdit} className="cursor-pointer">
          {/* // to avoid React warning about dangerouslySetInnerHTML. */}
          <div dangerouslySetInnerHTML={{ __html: text }} className="text-base-content text-pretty text-ellipsis rounded-xl min-w-10 px-4 py-1" />
          <div
            id="icon"
            className={`absolute flex place-items-center justify-center top-0 left:50px hover:bg-white/80 active:bg-white rounded-lg w-full h-full border-white border hover:border-slate-200
            [&>svg]:rounded-lg
            [&>svg]:invisible [&>svg]:hover:visible
            [&>svg]:bg-primary-400
            [&>svg]:shadow-shadow1
            [&>svg]:m-1
            `}
          >
            <SvgSprite size={20} iconName="edit" />
          </div>
          <div className="absolute right-0 top-0">
            <SvgSprite className=" fill-slate-300" size={15} iconName="edit" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditable;
