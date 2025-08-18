import React, { useEffect, useRef, useState } from "react";
import SvgSprite from "@/components/SvgSprite";
import { useRecipeData } from "@/contexts/useRecipeData";
import DOMPurify from "dompurify";
import TiptapEditor from "./TiptapEditor";
import Pill from "./Pill";
import Spinner from "./Spinner"; // Assuming you have a Spinner component

interface TextEditableProps {
  path: string;
  instantDbUpdate?: boolean;
  dbUpdateConfig?: {
    model: string;
    id: string;
    field: string;
  };
}

const TextEditable = ({ path, instantDbUpdate = false, dbUpdateConfig }: TextEditableProps) => {
  const { recipeData, getRecipeDataByPath, setRecipeDataByPath } = useRecipeData();

  const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Function to handle clicks outside the component to cancel editing
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        handleCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Initialize and update the text state from the central recipe data
  useEffect(() => {
    const initialValue = getRecipeDataByPath(path, recipeData);
    const sanitizedText = DOMPurify.sanitize(initialValue ? String(initialValue) : "");
    setText(sanitizedText);
  }, [path, getRecipeDataByPath, recipeData]);

  // Function to switch to edit mode
  const handleEdit = () => {
    if (saveStatus !== "idle") return; // Don't allow editing if a save is in progress
    setEditing(true);
    setTimeout(() => {
      const editorElement = document.querySelector(".tiptap-editor");
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

  // Function to save text
  const handleSave = async () => {
    if (!text.trim() || saveStatus === "saving") {
      return;
    }

    const originalText = getRecipeDataByPath(path, recipeData);
    if (text === originalText) {
      setEditing(false); // No changes, just close
      return;
    }

    // Optimistic UI update
    setRecipeDataByPath(path, text, recipeData);

    if (instantDbUpdate && dbUpdateConfig) {
      setSaveStatus("saving");
      try {
        const response = await fetch("/api/update-field", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: dbUpdateConfig.model,
            id: dbUpdateConfig.id,
            field: dbUpdateConfig.field,
            value: text,
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.text();
          throw new Error(errorResponse || "Failed to save to database");
        }

        setSaveStatus("success");
        setTimeout(() => {
          setSaveStatus("idle");
          setEditing(false); // Close editor on successful save
        }, 1500);
      } catch (error) {
        console.error("Error saving text:", error);
        setSaveStatus("error");
        // Revert optimistic update on failure
        setRecipeDataByPath(path, originalText, recipeData);
        setText(originalText); // Also revert the editor's internal text state
        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);
      }
    } else {
      // If not updating DB, just close the editor
      setEditing(false);
    }
  };

  // Update text state as user types in Tiptap editor
  const handleTiptapChange = (content: string) => {
    setText(content);
  };

  // Function to cancel editing and revert any changes
  const handleCancel = () => {
    setText(getRecipeDataByPath(path, recipeData)); // Reset text from source
    setEditing(false);
    setSaveStatus("idle");
  };

  return (
    <div className={`relative`} ref={wrapperRef}>
      {editing ? (
        <div>
          <TiptapEditor content={text} onChange={handleTiptapChange} />
          <div className="flex items-center gap-3 p-2">
            <Pill className="text-xs" iconName="save" tone="dark" onClick={handleSave} disabled={saveStatus === "saving"}>
              {saveStatus === "saving" ? "Saving..." : "Save"}
            </Pill>
            <Pill className="text-xs" iconName="close" tone="clear" onClick={handleCancel}>
              Cancel
            </Pill>
            <div className="w-5 h-5">
              {saveStatus === "saving" && <Spinner />}
              {saveStatus === "success" && <SvgSprite iconName="check_circle" className="text-green-500" />}
              {saveStatus === "error" && <SvgSprite iconName="error" className="text-red-500" />}
            </div>
          </div>
        </div>
      ) : (
        <div onClick={handleEdit} className="cursor-pointer group">
          <div dangerouslySetInnerHTML={{ __html: text || "<p>Enter text...</p>" }} className="text-base-content text-pretty text-ellipsis rounded-xl min-w-10 px-4 py-1" />
          <div
            id="icon"
            className={`absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg border border-transparent group-hover:border-slate-200`}
          >
            <SvgSprite size={20} iconName="edit" className="bg-primary-400 shadow-shadow1 rounded-lg" />
          </div>
          <div className="absolute right-0 top-0">
            <SvgSprite className="fill-slate-300" size={15} iconName="edit" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditable;
