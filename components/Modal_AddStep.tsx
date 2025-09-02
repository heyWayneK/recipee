import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Button from "./Button";
import { useAddStepModalStore } from "@/hooks/useAddStepModalStore";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { getValueByPath, setValueByPath } from "@/utils/getSetValueFromObject";
import Loading from "./Loading";
import BetterIcon from "./BetterIcon";
import { v4 as uuidv4 } from "uuid";

type SaveStatus = "idle" | "saving" | "success" | "error";

const Modal_AddStep = () => {
  const { isOpen, closeModal, componentPath } = useAddStepModalStore();
  const { recipeData, setRecipeData } = useRecipeDataStore();
  const [stepInstruction, setStepInstruction] = useState("Add your Step Details");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [sortAction, setSortAction] = useState<"before" | "after">("after");
  const [targetRowUuid, setTargetRowUuid] = useState<string | "last">("last");

  const component = componentPath ? getValueByPath(recipeData, componentPath) : null;
  const recipeDetails = component ? component.recipeDetail : [];

  useEffect(() => {
    if (!isOpen) {
      setStepInstruction("Add your Step Details");
      setSaveStatus("idle");
      setTargetRowUuid("last");
    }
  }, [isOpen]);

  const handleAddStep = async () => {
    if (!componentPath) return;
    setSaveStatus("saving");

    const newUuid = uuidv4();
    let newRecipeDetails = [...recipeDetails];
    const newRowData = {
      uuid: newUuid,
      step_instruction: stepInstruction,
      ingredient_type_name: "step",
    };

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

    const newRowWithSortOrder = rowsToUpdate.find(row => row.uuid === newUuid);

    const createResponse = await fetch("/api/recipe-detail-row/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newRowWithSortOrder,
        recipe_uuid: recipeData.data.uuid,
        recipe_components_on_recipeUuid: component.uuid,
      }),
    });

    const reorderPayload = rowsToUpdate.filter(row => row.uuid !== newUuid).map(({ uuid, sort_order }) => ({ uuid, sort_order }));
    const reorderResponse = reorderPayload.length > 0 ? await fetch("/api/recipe-detail-row/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowsToUpdate: reorderPayload }),
    }) : { ok: true };

    if (createResponse.ok && reorderResponse.ok) {
      const createdRow = await createResponse.json();
      newRecipeDetails[insertionIndex] = createdRow;
      const newRecipeData = setValueByPath(recipeData, `${componentPath}.recipeDetail`, newRecipeDetails);
      setRecipeData(newRecipeData);
      setSaveStatus("success");
      setTimeout(() => closeModal(), 1000);
    } else {
      setSaveStatus("error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="overflow-y-auto bg-black border border-[#222222] max-h-[90vh] max-w-[650px] w-full text-white">
        <DialogHeader>
          <DialogTitle>Add Step</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <textarea value={stepInstruction} onChange={(e) => setStepInstruction(e.target.value)} className="p-2 bg-gray-800 rounded min-h-24" />

          <p>Where to add?</p>
          <div className="flex gap-2">
            <select value={sortAction} onChange={(e) => setSortAction(e.target.value as any)} className="p-2 bg-gray-800 rounded">
              <option value="after">After</option>
              <option value="before">Before</option>
            </select>
            <select value={targetRowUuid} onChange={(e) => setTargetRowUuid(e.target.value)} className="p-2 bg-gray-800 rounded w-full">
              {recipeDetails.map((item: any) => ( <option key={item.uuid} value={item.uuid}>{item.name_extra_info || item.step_instruction || "Unnamed Row"}</option> ))}
              <option value="last">End of list</option>
            </select>
          </div>
        </div>

        <DialogFooter className="mt-4">
            <div className="flex justify-end items-center gap-2 w-full">
                {saveStatus === "idle" && (
                    <Button text="Add Step" onClick={handleAddStep} />
                )}
                <div className="w-5 h-5">
                    {saveStatus === "saving" && <Loading />}
                    {saveStatus === "success" && <BetterIcon iconName="check_circle" className="text-green-500" />}
                    {saveStatus === "error" && <BetterIcon iconName="error" className="text-red-500" />}
                </div>
                <Button text="Close" onClick={closeModal} />
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal_AddStep;
