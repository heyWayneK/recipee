import React, { useCallback, useEffect, useRef, useState } from "react";
import SvgSprite from "@/components/SvgSprite";
import { useRecipeData } from "@/contexts/useRecipeData";
import DOMPurify from "dompurify";
import TiptapEditor from "./TiptapEditor";
import { useModalBig } from "@/hooks/UseBigModal";
import { getTextTranslation } from "@/utils/utils";
import { idColnameType } from "@/types/recipeTypes";
import Spinner from "./Spinner";
import Pill from "./Pill";
import { set } from "cypress/types/lodash";
import { use } from "chai";

interface TextEditableProps {
  title: string; // Title for the modal or component
  path: string | undefined; // Path in the recipe data to update, e.g., "data.name"
  dbExpectedType: "uuid" | "html" | "plaintext" | "int" | "decimal"; // db type of validation
  optionalContent: string; // Optional, if you want to pass initial content
  instantDbUpdate?: boolean;
  dbUpdateConfig?: {
    model: string; // Prisma model name
    id: string | number; // id value of the db row to update
    idColName: idColnameType; // Default is "id"
    field: string; // Column name to update in the database
  };
}

const TextEditable = ({ title = getTextTranslation("Edit"), path = undefined, instantDbUpdate = false, dbExpectedType = "plaintext", optionalContent = "", dbUpdateConfig }: TextEditableProps) => {
  const { recipeData, getRecipeDataByPath, setRecipeDataByPath } = useRecipeData();

  // const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { openModal, closeModal, updateText } = useModalBig();

  // Function to cancel editing and revert any changes
  const handleCancel = useCallback(() => {
    // alert("CANCEL.");
    if (path) setText(getRecipeDataByPath(path, recipeData)); // Reset text from source
    // setEditing(false);
    setSaveStatus("idle");
    closeModal();
  }, [path, getRecipeDataByPath, recipeData, closeModal]);

  // Function to handle clicks outside the component to cancel editing
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
  //       // handleCancel();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [wrapperRef, handleCancel]);

  useEffect(() => {
    console.log("UseEfffect text", text);
  }, [text]);

  // Initialize and update the text state from the central recipe data
  useEffect(() => {
    const initialValue = path ? getRecipeDataByPath(path, recipeData) : optionalContent;
    const sanitizedText = DOMPurify.sanitize(initialValue ? String(initialValue) : "");
    setText(sanitizedText);
  }, [path, getRecipeDataByPath, recipeData, optionalContent]);

  // Function to switch to edit mode
  // const handleEdit = () => {
  //   if (saveStatus !== "idle") return; // Don't allow editing if a save is in progress
  //   setEditing(true);
  //   setTimeout(() => {
  //     const editorElement = document.querySelector(".tiptap-editor");
  //     if (editorElement) {
  //       (editorElement as HTMLElement).focus();
  //       const selection = window.getSelection();
  //       const range = document.createRange();
  //       range.selectNodeContents(editorElement);
  //       selection?.removeAllRanges();
  //       selection?.addRange(range);
  //     } else {
  //       console.error("Editor element not found");
  //     }
  //   }, 0);
  // };

  // Function to save text
  const handleSave = useCallback(async () => {
    console.log("handleSave", text, path, saveStatus);
    if (!text.trim() || saveStatus === "saving") {
      console.warn("Nothing to save or already saving.");
      return;
    }

    const originalText = path ? getRecipeDataByPath(path, recipeData) : text;
    if (text === originalText) {
      // setEditing(false); // No changes, just close
      return;
    }

    console.log("Original text:", originalText);
    console.log("text:", text);

    // Optimistic UI update
    if (path) setRecipeDataByPath(path, text, recipeData);

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
          throw new Error(errorResponse || `Failed to save to database: ${response.status}  ${response.text}`);
        }

        setSaveStatus("success");
        closeModal();
        setTimeout(() => {
          setSaveStatus("idle");
          // setEditing(false); // Close editor on successful save
        }, 1500);
      } catch (error) {
        console.error("Error saving text:", error);
        setSaveStatus("error");
        // Revert optimistic update on failure
        if (path) setRecipeDataByPath(path, originalText, recipeData);
        setText(originalText); // Also revert the editor's internal text state
        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);
      }
    } else {
      // If not updating DB, just close the editor
      // setEditing(false);
      handleCancel();
    }
  }, [text, path, saveStatus, getRecipeDataByPath, setRecipeDataByPath, recipeData, instantDbUpdate, dbUpdateConfig, handleCancel, optionalContent, closeModal]);

  // Update text state as user types in Tiptap editor
  const handleTiptapChange = useCallback(
    (content: string) => {
      console.log("handleTiptapChange", content);
      setText(content);
      updateText(content); // Update the modal content with the new text
      return content; // Return the updated content
    },
    [updateText]
  );

  // interface handleOpenModelProps {
  //   handleSave: () ;
  //   handleCancel: ();
  //   handleTiptapChange: (content: string) => string | number;
  // }

  // const handleOpenModal = (handleTiptapChange: (content: string) => string, handleSave: () => void, handleCancel: () => void) => {
  const handleOpenModal = (text: string) => {
    // setEditing(true); // Set editing state to true when opening modal

    // FOCUS and SELECT TEXT in Tiptap editor window
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

    openModal(
      <div ref={wrapperRef}>
        <h2 className="text-lg font-semibold mb-4 text-base-content">{title}</h2>
        <h3 className="text-xs font-semibold mb-4 text-base-content">was: {recipeData.data.name}</h3>
        <h3 className="text-xs font-semibold mb-4 text-base-content">new: {text}</h3>
        <TiptapEditor formatButtons="none" content={text} onChange={handleTiptapChange} />
        <div className="flex items-center gap-3 p-2">
          {/* Save Button */}
          <Pill className="text-xs" iconName="save" tone="dark" onClick={handleSave} disabled={saveStatus === "saving"}>
            {saveStatus === "saving" ? "Saving..." : "Save"}
          </Pill>
          {/* Cancel Button */}
          <Pill className="text-xs" iconName="close" tone="clear" onClick={handleCancel}>
            Cancel
          </Pill>
          {/* Success/Fail/Saving Status indicator */}
          <div className="w-5 h-5">
            {saveStatus === "idle" && <span className="text-info">...idle</span>}
            {saveStatus === "saving" && <Spinner />}
            {saveStatus === "success" && <SvgSprite iconName="check_circle" className=" text-success" />}
            {saveStatus === "error" && <SvgSprite iconName="error" className="text-error" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative w-full`} ref={wrapperRef}>
      {/* {editing ? (
        <div>
          <TiptapEditor formatButtons="none" content={text} onChange={handleTiptapChange} />
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
      ) : ( */}
      {/* // <div onClick={handleEdit} className="cursor-pointer group"> */}
      {/* <div onClick={() => handleOpenModal(handleTiptapChange, handleSave, handleCancel)} className="cursor-pointer group"> */}
      <div onClick={() => handleOpenModal(text)} className="cursor-pointer group">
        {/*  TODO: use dbType to determine how to render the text _html or _plaintext */}
        <div dangerouslySetInnerHTML={{ __html: text || optionalContent }} className="text-base-content text-pretty text-ellipsis rounded-xl min-w-10 px-4 py-1  " />
        {/* Mouseover circle edit icon */}
        <div id="icon" className={`absolute inset-0 flex items-center justify-center fill-primary-100 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg border border-transparent`}>
          <SvgSprite size={20} iconName="edit" className="bg-secondary-500 fill-white p-1 shadow-lg shadow-secondary-300 rounded-full" />
        </div>
        {/* Edit Pencil on right */}
        <div className="absolute right-1 top-1">
          <SvgSprite className="fill-neutral-300" size={15} iconName="edit" />
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default TextEditable;
