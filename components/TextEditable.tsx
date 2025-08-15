import React, { useEffect, useState } from "react";
import SvgSprite from "@/components/SvgSprite";
import { useRecipeData } from "@/contexts/useRecipeData";
import { PreCalculatedRecipeData } from "@/types/recipeTypes";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

// Dynamically import ReactQuill with SSR turned off
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

// Define a type for paths in PreCalculatedRecipeData, but as a string literal
type PathString = keyof PreCalculatedRecipeData | `${keyof PreCalculatedRecipeData & string}.${string}`;

// Define a helper to get the value type at a path, simplified for our use case
type PathValue<T, P extends PathString> = P extends `${infer K}.${infer Rest}` ? (K extends keyof T ? (Rest extends keyof T[K] ? T[K][Rest] : never) : never) : P extends keyof T ? T[P] : never;

// Now define TextEditableProps with generic path
interface TextEditableProps<P extends PathString = PathString> {
  children?: React.ReactNode;
  // Here, P is the path, and PathValue<PreCalculatedRecipeData, P> is the type at that path
  initialTextObject: { [K in P]: PathValue<PreCalculatedRecipeData, P> };
  className?: string;
  onSave?: (text: string, path: P) => void;
}

const TextEditable = <P extends PathString>({ initialTextObject, onSave, className }: TextEditableProps<P>) => {
  const { recipeData, updateRecipeData } = useRecipeData();
  const [path, value] = Object.entries(initialTextObject)[0] as [P, PathValue<PreCalculatedRecipeData, P>];

  const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState(value ? String(value) : "");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Initialize text with the value from initialTextObject
    // Sanitize the HTML before rendering to prevent XSS attacks
    const sanitizedText = DOMPurify.sanitize(value ? String(value) : "");
    setText(sanitizedText);
  }, [value]);

  // Function to switch to edit mode
  const handleEdit = () => {
    setEditing(true);
  };

  // Function to save text and switch back to view mode
  const handleSave = () => {
    if (!text.trim()) {
      alert("Cannot save empty content.");
      return;
    }
    onSave && onSave(text, path);
    // Here you would typically also call updateRecipeData or a similar function
    // For demonstration, let's assume onSave handles it.
    setEditing(false);
  };

  const handleQuillChange = (content: string) => {
    setText(content);
  };

  return (
    <div className={`relative ${className}`}>
      {editing ? (
        <div>
          {isClient && (
            <ReactQuill
              theme="snow"
              value={text}
              onChange={handleQuillChange}
            />
          )}
          <button onClick={handleSave} style={{ marginTop: "10px" }}>
            Save Content 💾
          </button>
        </div>
      ) : (
        <div onClick={handleEdit} className="cursor-pointer">
          <div
             dangerouslySetInnerHTML={{ __html: text }}
             className="text-base-content text-pretty text-ellipsis rounded-xl min-w-10 px-4 py-1"
           />
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
