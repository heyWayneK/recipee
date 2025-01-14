"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/modal";
import { useModalBig } from "@/hooks/UseBigModal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, content, closeModal } = useModalBig();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}
