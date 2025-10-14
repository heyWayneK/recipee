import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Button from "./Button";
import { useAddIngredientModalStore } from "@/hooks/useAddIngredientModalStore";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { IngredientSelect, RecipesInDataProps } from "@/types/recipeTypes";
import { getValueByPath, setValueByPath } from "@/utils/getSetValueFromObject";
import Loading from "./Loading";
import BetterIcon from "./BetterIcon";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./Spinner";
import SvgSprite from "./SvgSprite";
import { Recipe_detail_rowPosts } from "@/types/recipeTypes_prisma";
import SvgSpriteLink from "./SvgSpriteLink";
import Pill from "./Pill";

type SaveStatus = "idle" | "saving" | "success" | "error";

const Modal_AddIngredient = () => {
  const { isOpen, closeModal, componentPath } = useAddIngredientModalStore();
  const { recipeData, setRecipeData, systemData, setSystemData } = useRecipeDataStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IngredientSelect[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientSelect | null>(null);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const [sortAction, setSortAction] = useState<"before" | "after">("after");
  const [targetRowUuid, setTargetRowUuid] = useState<string | "last">("last");

  const component: RecipesInDataProps = componentPath ? getValueByPath(recipeData, componentPath) : null;
  const recipeDetails: Recipe_detail_rowPosts[] = component ? component.recipe_detail : [];

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIngredient(null);
      setNewIngredientName("");
      setSaveStatus("idle");
      setTargetRowUuid("last");
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      const response = await fetch(`/api/ingredients/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    };
    const debounce = setTimeout(() => fetchResults(), 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleAddIngredient = async (ingredientId: number) => {
    if (!componentPath) return;
    setSaveStatus("saving");

    const newUuid = uuidv4();
    let newRecipeDetails = [...recipeDetails];
    const newRowData = {
      uuid: newUuid,
      // ingredients_id: ingredientId,
      name_extra_info: selectedIngredient?.name || newIngredientName,
      ingredients_id: ingredientId,
      // ingredient_type: { name: "ingredient" as recipe_row_types_type },
    } as Recipe_detail_rowPosts;

    let insertionIndex = recipeDetails.length;
    if (targetRowUuid !== "last") {
      const targetIndex = recipeDetails.findIndex((row: any) => row.uuid === targetRowUuid);
      if (targetIndex !== -1) {
        insertionIndex = sortAction === "after" ? targetIndex + 1 : targetIndex;
      }
    }
    newRecipeDetails.splice(insertionIndex, 0, newRowData);

    const rowsToUpdate = newRecipeDetails.map((row, index) => ({
      ...row,
      sort_order: index + 1,
    }));

    const newRowWithSortOrder = rowsToUpdate.find((row) => row.uuid === newUuid);

    const createResponse = await fetch("/api/recipe-detail-row/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newRowWithSortOrder,
        recipe_uuid: recipeData.data.uuid,
        recipe_components_on_recipeUuid: component.uuid,
        ingredient_type_name: "ingredient",
      }),
    });

    const reorderPayload = rowsToUpdate.filter((row) => row.uuid !== newUuid).map(({ uuid, sort_order }) => ({ uuid, sort_order }));
    const reorderResponse =
      reorderPayload.length > 0
        ? await fetch("/api/recipe-detail-row/reorder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rowsToUpdate: reorderPayload }),
          })
        : { ok: true };

    if (createResponse.ok && reorderResponse.ok) {
      const createdRow = await createResponse.json();
      newRecipeDetails[insertionIndex] = createdRow;
      const newRecipeData = setValueByPath(recipeData, `${componentPath}.recipe_detail`, newRecipeDetails);
      setRecipeData(newRecipeData);
      setSaveStatus("success");
      setTimeout(() => closeModal(), 1000);
    } else {
      setSaveStatus("error");
    }
  };

  const handleCreateNewIngredient = async () => {
    if (!newIngredientName) return;
    setSaveStatus("saving");

    try {
      const response = await fetch("/api/ingredients/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newIngredientName }),
      });

      if (response.ok) {
        const newIngredient = await response.json();

        // There is a typo in `types/recipeTypes.ts`, systemData.ingredients is IngredientTypeSelect[] instead of IngredientSelect[]
        // I will assume it should be IngredientSelect[] and add the new ingredient to the list.
        // I will cast systemData.ingredients to any to avoid typescript error.
        const newSystemData = {
          ...systemData,
          ingredients: [...(systemData.ingredients as any), newIngredient],
        };
        setSystemData(newSystemData);

        await handleAddIngredient(newIngredient.id);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      setSaveStatus("error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="overflow-y-auto bg-base-100 border border-base-content max-h-[90vh] max-w-[650px] w-full text-base-content">
        <DialogHeader>
          <DialogTitle>Add Ingredient</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {/* Search */}
          <input type="text" placeholder="Search for an ingredient..." value={query} onChange={(e) => setQuery(e.target.value)} className="p-2 bg-base-200 border-accent rounded" />
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {results.map((ing) => (
              <div key={ing.id} onClick={() => setSelectedIngredient(ing)} className={`p-2 rounded cursor-pointer ${selectedIngredient?.id === ing.id ? "bg-secondary-500" : "bg-base-200"}`}>
                {ing.name}
              </div>
            ))}
          </div>

          {/* Sort Order */}
          {/* <hr className="my-2 border-base-content" /> */}
          <div>
            <div className=" flex items-center">
              <p className="text-nowrap p-2 text-sm">Ingredient Position?</p>
              <div className="flex gap-2">
                <select value={sortAction} onChange={(e) => setSortAction(e.target.value as any)} className="p-2 bg-base-200 rounded">
                  <option value="after">After</option>
                  <option value="before">Before</option>
                </select>
                <select value={targetRowUuid} onChange={(e) => setTargetRowUuid(e.target.value)} className="p-2 bg-base-200 rounded w-full">
                  {recipeDetails.map((item) => (
                    <option key={item.uuid} value={item.uuid}>
                      {item.ingredient_type.name}: {item?.ingredients?.name || item.name_extra_info || item.step_instruction || "Unnamed Row"}
                    </option>
                  ))}
                  <option value="last">End of list</option>
                </select>
              </div>
            </div>
          </div>

          {/* Create New */}
          <hr className="my-2 border-base-content" />
          <p>Or create a new Ingredient:</p>
          <input type="text" placeholder="New ingredient name" value={newIngredientName} onChange={(e) => setNewIngredientName(e.target.value)} className="p-2 bg-base-200 rounded" />
        </div>

        <DialogFooter className="mt-4">
          <div className="flex justify-end items-center gap-2 w-full">
            {saveStatus === "idle" && (
              <>
                {selectedIngredient && (
                  <Pill tone="dark" iconName="add_circle" onClick={() => handleAddIngredient(selectedIngredient!.id)}>
                    Add Selected
                  </Pill>
                )}
                {newIngredientName && (
                  <Pill tone="dark" iconName="add_circle" onClick={handleCreateNewIngredient}>
                    Create and Add
                  </Pill>
                )}
              </>
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

export default Modal_AddIngredient;
