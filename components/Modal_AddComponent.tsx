import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Button from "./Button";
import { useAddComponentModalStore } from "@/hooks/useAddComponentModalStore";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { ComponentsInDataProps, RecipesInDataProps } from "@/types/recipeTypes";
import { setValueByPath } from "@/utils/getSetValueFromObject";
import Spinner from "./Spinner";
import SvgSprite from "./SvgSprite";
import Pill from "./Pill";
import { v4 as uuidv4 } from "uuid";

type SaveStatus = "idle" | "saving" | "success" | "error";

const Modal_AddComponent = () => {
  const { isOpen, closeModal } = useAddComponentModalStore();
  const { recipeData, setRecipeData, setRecipeDataByPath } = useRecipeDataStore();
  const [newRecipeName, setNewRecipeName] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [sortAction, setSortAction] = useState<"before" | "after">("after");
  const [targetRecipeUuid, setTargetRecipeUuid] = useState<string | "last">("last");

  const recipes = recipeData.data.recipes;

  useEffect(() => {
    if (!isOpen) {
      setNewRecipeName("");
      setSaveStatus("idle");
      setTargetRecipeUuid("last");
    }
  }, [isOpen]);

  const handleAddComponent = async () => {
    if (!newRecipeName) return;
    setSaveStatus("saving");

    // const newComponentUuid = uuidv4();
    const newRecipeUuid = uuidv4();

    // const newComponent: ComponentsInDataProps = {
    //   uuid: newComponentUuid,
    //   name: newRecipeName,
    //   recipe_id: newRecipeUuid,
    //   order: 0, // Will be set later
    //   versions: [],
    //   portions: [],
    // };

    const newRecipe: RecipesInDataProps = {
      uuid: newRecipeUuid,
      name: newRecipeName,
      cost_per_1000g: 0,
      brand: {} as any, // Should be filled with actual brand data
      customer: {} as any, // Should be filled with actual customer data
      recipe_detail: [],
      method: "",
      order: 0, // Will be set later
      portions: [],
    };

    // let newRecipes = [...recipes];
    // let newRecipes = recipes;
    let insertionIndex = recipes.length;
    if (targetRecipeUuid !== "last") {
      const targetIndex = recipes.findIndex((c) => c.uuid === targetRecipeUuid);
      if (targetIndex !== -1) {
        insertionIndex = sortAction === "after" ? targetIndex + 1 : targetIndex;
      }
    }

    // newRecipes.splice(insertionIndex, 0, newRecipe);
    // newRecipes = newRecipes.map((c, index) => ({ ...c, order: index + 1 }));

    const newRecipes = [...recipeData.data.recipes, newRecipe];

    const response = await fetch("/api/components/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // newComponent,
        newRecipe,
        recipeUuid: recipeData.data.uuid,
      }),
    });

    if (response.ok) {
      const { createdComponent, createdRecipe } = await response.json();
      // Replace the temporary new component with the one from the DB
      // newRecipes[insertionIndex] = {
      //   ...newRecipes,
      //   uuid: createdComponent.component_recipe_uuid, // The component uuid is the recipe uuid of the component
      // };
      const newRecipeData = setValueByPath(recipeData, "data.components", newRecipes);
      const finalRecipeData = setValueByPath(newRecipeData, "data.recipes", [...recipeData.data.recipes, createdRecipe]);
      setRecipeData(finalRecipeData);

      setSaveStatus("success");
      setTimeout(() => closeModal(), 1000);
    } else {
      setSaveStatus("error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="overflow-y-auto bg-base-100 border border-base-content max-h-[90vh] max-w-[650px] w-full text-base-content">
        <DialogHeader>
          <DialogTitle>Add Component</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {/* Component Name */}
          <input type="text" placeholder="New component name" value={newRecipeName} onChange={(e) => setNewRecipeName(e.target.value)} className="p-2 bg-base-200 rounded" />

          {/* Sort Order */}
          <div>
            <div className=" flex items-center">
              <p className="text-nowrap p-2 text-sm">Where to place new component?</p>
              <div className="flex gap-2">
                <select value={sortAction} onChange={(e) => setSortAction(e.target.value as any)} className="p-2 bg-base-200 rounded">
                  <option value="after">After</option>
                  <option value="before">Before</option>
                </select>
                <select value={targetRecipeUuid} onChange={(e) => setTargetRecipeUuid(e.target.value)} className="p-2 bg-base-200 rounded w-full">
                  {recipes.map((c) => (
                    <option key={c.uuid} value={c.uuid}>
                      {c.name}
                    </option>
                  ))}
                  <option value="last">End of list</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <div className="flex justify-end items-center gap-2 w-full">
            {saveStatus === "idle" && (
              <Pill tone="dark" iconName="add_circle" onClick={handleAddComponent} disabled={!newRecipeName}>
                Create and Add
              </Pill>
            )}
            {saveStatus === "error" && (
              <>
                <Pill tone="dark" disabled={true} className="bg-error text-error-content">
                  Error
                </Pill>
                <Button text="Try Again" onClick={() => setSaveStatus("idle")} />
              </>
            )}
            <div className="w-5 h-5">
              {saveStatus === "saving" && <Spinner />}
              {saveStatus === "success" && <SvgSprite iconName="check_circle" className="text-success" />}
              {saveStatus === "error" && <SvgSprite iconName="error" className="text-error" />}
            </div>
            <Button text="Close" onClick={closeModal} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal_AddComponent;
