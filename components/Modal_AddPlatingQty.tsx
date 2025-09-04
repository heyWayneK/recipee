import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Button from "./Button";
import { useAddPlatingQtyModalStore } from "@/hooks/useAddPlatingQtyModalStore";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { portionSizeProps, ComponentsInDataProps } from "@/types/recipeTypes";
import { setValueByPath } from "@/utils/getSetValueFromObject";
import Spinner from "./Spinner";
import SvgSprite from "./SvgSprite";
import Pill from "./Pill";
import Decimal from "decimal.js";

type SaveStatus = "idle" | "saving" | "success" | "error";

const Modal_AddPlatingQty = () => {
  const { isOpen, closeModal } = useAddPlatingQtyModalStore();
  const { recipeData, setRecipeData } = useRecipeDataStore();
  const [newQtyG, setNewQtyG] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    if (!isOpen) {
      setNewQtyG("");
      setSaveStatus("idle");
    }
  }, [isOpen]);

  const handleAddPlatingQty = async () => {
    if (!newQtyG) return;
    setSaveStatus("saving");

    const newQty = new Decimal(newQtyG);
    const portions = recipeData.data.portions;
    const lastPortion = portions[portions.length - 1];

    if (!lastPortion) {
      // Handle case with no existing portions, maybe just add the new portion with 100% of it in the first component
      // For now, let's assume there is always at least one portion
      setSaveStatus("error");
      return;
    }

    const ratio = newQty.div(lastPortion.qty_g);

    const newPortions = [
      ...portions,
      {
        id: portions.length + 1, // This should be a proper ID from the DB
        qty_g: newQty.toDP(2).toNumber(),
        order: portions.length + 1,
      },
    ];

    const newComponents = recipeData.data.components.map((component) => {
      const lastComponentPortion = component.portions.find((p) => p.id === lastPortion.id);
      const newPortionQty = new Decimal(lastComponentPortion?.qty_g || 0).mul(ratio);

      return {
        ...component,
        portions: [
          ...component.portions,
          {
            id: newPortions[newPortions.length - 1].id,
            qty_g: newPortionQty.toDP(2).toNumber(),
          },
        ],
      };
    });

    const componentPortions = newComponents.map((c) => ({
      component_recipe_uuid: c.uuid,
      qty_g: c.portions[c.portions.length - 1].qty_g,
    }));

    const response = await fetch("/api/portions/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeUuid: recipeData.data.uuid,
        newPortion: newPortions[newPortions.length - 1],
        componentPortions,
      }),
    });

    if (response.ok) {
      const { createdPortion, createdComponentPortions } = await response.json();

      // Update the temporary new portion with the one from the DB
      newPortions[newPortions.length - 1] = createdPortion;

      // Update component portions with the new IDs
      const updatedComponents = newComponents.map((component) => {
        const matchingComponentPortion = createdComponentPortions.find(
          (cp: any) => cp.component_recipe_uuid === component.uuid
        );
        if (matchingComponentPortion) {
          component.portions[component.portions.length - 1].id = matchingComponentPortion.recipe_portion_id;
        }
        return component;
      });

      const newRecipeData = setValueByPath(recipeData, "data.portions", newPortions);
      const finalRecipeData = setValueByPath(newRecipeData, "data.components", updatedComponents);
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
          <DialogTitle>Add Plating Quantity</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="New plating quantity (g)"
            value={newQtyG}
            onChange={(e) => setNewQtyG(e.target.value)}
            className="p-2 bg-base-200 rounded"
          />
        </div>

        <DialogFooter className="mt-4">
          <div className="flex justify-end items-center gap-2 w-full">
            {saveStatus === "idle" && (
              <Pill tone="dark" iconName="add_circle" onClick={handleAddPlatingQty} disabled={!newQtyG}>
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

export default Modal_AddPlatingQty;
