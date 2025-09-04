import React, { useCallback, useEffect, useState, useRef } from "react";
import SvgSprite from "@/components/SvgSprite";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import DOMPurify from "dompurify";
import { DbExpectedType, useModalBig } from "@/hooks/UseBigModal";
import { idColnameType } from "@/types/recipeTypes";

interface TextEditableProps {
  title: string;
  path: string | undefined;
  dbExpectedType: DbExpectedType;
  optionalContent: string;
  instantDbUpdate?: boolean;
  dbUpdateConfig?: {
    model: string;
    id: string | number;
    idColName: idColnameType;
    field: string;
  };
}

const TextEditable = ({ title = "Edit", path = undefined, instantDbUpdate = false, optionalContent = ">>>...", dbUpdateConfig, dbExpectedType = "plaintext" }: TextEditableProps) => {
  // TODO: Add if statements for dbExpectedType to plain and htmltext
  const { recipeData, getRecipeDataByPath, setRecipeDataByPath } = useRecipeDataStore();
  const { openModal, closeModal, setSaveStatus } = useModalBig();

  const [displayedText, setDisplayedText] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const initialValue = path ? getRecipeDataByPath(path, recipeData) : optionalContent;
    const initialValue = path ? getRecipeDataByPath(path) : optionalContent;
    const sanitizedText = DOMPurify.sanitize(initialValue ? String(initialValue) : "");
    setDisplayedText(sanitizedText);
  }, [path, getRecipeDataByPath, recipeData, optionalContent]);

  const handleSave = useCallback(async () => {
    const newText = useModalBig.getState().text;

    if (newText.trim() === displayedText.trim()) {
      // If the text hasn't changed, just close the modal
      closeModal();
      return;
    }

    if (path) {
      // Update the recipe data with the new text
      // setRecipeDataByPath(path, newText, recipeData);
      setRecipeDataByPath(path, newText);
      setDisplayedText(newText);
    }

    if (instantDbUpdate && dbUpdateConfig) {
      setSaveStatus("saving");

      console.log(
        "Saving text to database:",
        JSON.stringify({
          model: dbUpdateConfig.model,
          id: dbUpdateConfig.id,
          field: dbUpdateConfig.field,
          value: newText,
        })
      );

      try {
        const response = await fetch("/api/update-field", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: dbUpdateConfig.model,
            id: dbUpdateConfig.id,
            field: dbUpdateConfig.field,
            value: newText,
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.text();
          throw new Error(errorResponse || `Failed to save to database: ${response.status} ${response.text}`);
        }

        setSaveStatus("success");
        setTimeout(() => {
          closeModal();
        }, 1500);
      } catch (error) {
        console.error("Error saving text:", error);
        setSaveStatus("error");
        if (path) {
          // setRecipeDataByPath(path, displayedText, recipeData);
          setRecipeDataByPath(path, displayedText);
          setDisplayedText(displayedText);
        }
        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);
      }
    } else {
      closeModal();
    }
  }, [displayedText, path, instantDbUpdate, dbUpdateConfig, setRecipeDataByPath, closeModal, setSaveStatus]);

  const handleOpenModal = () => {
    openModal(title, displayedText, handleSave);
  };

  return (
    <div className={`relative w-full cursor-pointer group`} ref={wrapperRef} onClick={handleOpenModal}>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayedText || optionalContent) }}
        className="text-pretty text-ellipsis rounded-xl min-w-10 px-1 py-1 whitespace-nowrap text-base-300 bg-base-content/30"
      />
      <div id="icon" className={`absolute inset-0 flex items-center justify-center fill-primary-200 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg border border-transparent`}>
        <SvgSprite size={20} iconName="edit" className="bg-secondary-500 fill-200 p-1 shadow-lg shadow-secondary-300 rounded-full" />
      </div>
      <div className="absolute right-1 top-1">
        <SvgSprite className="fill-base-content/60" size={15} iconName="edit" />
      </div>
    </div>
  );
};

export default TextEditable;
