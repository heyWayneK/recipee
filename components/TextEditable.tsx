import React, { useState } from "react";
import SvgSprite from "@/components/SvgSprite";
import { PreCalculatedRecipeData, useRecipeData } from "@/contexts/UseRecipeData";

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
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();
  // Convert our initialTextObject to a key-value pair for dynamic access
  const [path, value] = Object.entries(initialTextObject)[0] as [P, PathValue<PreCalculatedRecipeData, P>];

  const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(value as string); // Assuming the value is serializable to string

  // Function to switch to edit mode
  const handleEdit = () => {
    alert("handle edit");
    setEditing(true);
  };

  // Function to save text and switch back to view mode
  const handleSave = () => {
    alert("handle save");
    onSave && onSave(text, path);
    setEditing(false);
  };

  // UPDATE OBJECT
  const update = (portionSize: number, ruleId: number) => {
    const newObj = { ...recipeData.data.packagingCostsId, ...{ [portionSize]: ruleId } };
    updateRecipeData((recipeData.data.packagingCostsId = { ...newObj }));
    // ADD HISTORY
  };

  // Function to handle text change in edit mode
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="relative" onClick={handleEdit}>
      {/* overflow-auto */}
      <span
        className={`${className}
        text-base-content text-pretty  text-ellipsis rounded-xl min-w-10 px-4 py-1 gap-x-1 cursor-pointer select-none hover:rounded-md 
      `}
      >
        <div>
          {editing ? (
            <div>
              <input className=" text-base-content" type="text" value={text} onChange={handleChange} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <span className="text-base-content">{text}</span>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      </span>
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
  );
};

export default TextEditable;
