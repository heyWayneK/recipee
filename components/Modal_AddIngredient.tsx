import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Button from "./Button";
import { useAddIngredientModalStore } from "@/hooks/useAddIngredientModalStore";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { IngredientSelect } from "@/types/recipeTypes";
import { getValueByPath, setValueByPath } from "@/utils/getSetValueFromObject";

const Modal_AddIngredient = () => {
  const { isOpen, closeModal, componentPath } = useAddIngredientModalStore();
  const { recipeData, setRecipeData } = useRecipeDataStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IngredientSelect[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientSelect | null>(null);
  const [newIngredientName, setNewIngredientName] = useState("");

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

    const debounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleAddIngredient = async (ingredientId: number) => {
    if (!componentPath) return;

    const component = getValueByPath(recipeData, componentPath);
    const newSortOrder = component.recipeDetail.length > 0 ? Math.max(...component.recipeDetail.map((d: any) => d.sort_order || 0)) + 1 : 1;

    const response = await fetch("/api/recipe-detail-row/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_uuid: recipeData.data.uuid,
        recipe_components_on_recipeUuid: component.uuid,
        sort_order: newSortOrder,
        ingredient_type_name: "ingredient",
        ingredients_id: ingredientId,
        name_extra_info: selectedIngredient?.name || newIngredientName,
      }),
    });

    if (response.ok) {
      const newRow = await response.json();
      const newRecipeDetails = [...component.recipeDetail, newRow];
      const newRecipeData = setValueByPath(recipeData, `${componentPath}.recipeDetail`, newRecipeDetails);
      setRecipeData(newRecipeData);
      closeModal();
    } else {
      console.error("Failed to add ingredient");
    }
  };

  const handleCreateNewIngredient = async () => {
    if (!newIngredientName) return;

    const response = await fetch("/api/ingredients/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newIngredientName }),
    });

    if (response.ok) {
      const newIngredient = await response.json();
      await handleAddIngredient(newIngredient.id);
    } else {
      console.error("Failed to create new ingredient");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="overflow-y-auto bg-black border border-[#222222] max-h-[90vh] max-w-[650px] w-full text-white">
        <DialogHeader>
          <DialogTitle>Add Ingredient</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search for an ingredient..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          />
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {results.map((ing) => (
              <div
                key={ing.id}
                onClick={() => setSelectedIngredient(ing)}
                className={`p-2 rounded cursor-pointer ${selectedIngredient?.id === ing.id ? "bg-blue-500" : "bg-gray-700"}`}
              >
                {ing.name}
              </div>
            ))}
          </div>

          {selectedIngredient && (
            <Button text={`Add "${selectedIngredient.name}"`} onClick={() => handleAddIngredient(selectedIngredient.id)} />
          )}

          <hr className="my-4 border-gray-600" />

          <div className="flex flex-col gap-2">
            <p>Can't find the ingredient? Add a new one:</p>
            <input
              type="text"
              placeholder="New ingredient name"
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
              className="p-2 bg-gray-800 rounded"
            />
            <Button text="Create and Add New Ingredient" onClick={handleCreateNewIngredient} disabled={!newIngredientName} />
          </div>
        </div>

        <DialogFooter>
            <Button text="Close" onClick={closeModal} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal_AddIngredient;
