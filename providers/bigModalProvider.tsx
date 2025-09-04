"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/modal";
import { useModalBig } from "@/hooks/UseBigModal";
import TiptapEditor from "@/components/TiptapEditor";
import Pill from "@/components/Pill";
import Spinner from "@/components/Spinner";
import SvgSprite from "@/components/SvgSprite";

export function BigModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, closeModal, title, text, setText, saveStatus, onSave, dbExpectedType } = useModalBig();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSave = async () => {
    await onSave();
  };

  const handleUpdate = (text: string) => {
    setText(text);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className=" bg-base-100">
        <div className="text-base-content">
          <h2 className="text-lg font-semibold mb-4 text-base-content">{title}</h2>
          {/* <TiptapEditor formatButtons="none" content={text} onChange={setText} /> */}
          <TiptapEditor formatButtons="none" content={text} onChange={handleUpdate} dbExpectedType={dbExpectedType} />
          <div className="flex items-center gap-3 p-2 mt-4">
            {/* Save Button */}
            <Pill className="text-xs" iconName="save" tone="dark" onClick={handleSave} disabled={saveStatus === "saving"}>
              {saveStatus === "saving" ? "Saving..." : "Save"}
            </Pill>
            {/* Cancel Button */}
            <Pill className="text-xs" iconName="close" tone="clear" onClick={closeModal}>
              Cancel
            </Pill>
            {/* Success/Fail/Saving Status indicator */}
            <div className="w-5 h-5 whitespace-nowrap text-warning">
              {saveStatus === "idle" &&
                // ...idle
                // <span className="text-info">...idle</span>
                (!useModalBig.getState().isTextUpdated ? "" : "(Remember to Save or Cancel)")}

              {saveStatus === "saving" && <Spinner />}
              {saveStatus === "success" && <SvgSprite iconName="check_circle" className="text-success" />}
              {saveStatus === "error" && <SvgSprite iconName="error" className="text-error" />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
