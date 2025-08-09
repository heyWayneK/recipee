"use client";

// WHY: Big modal window popup (Not the small menu options list modal)

/**
 * ModalProvider component
 * This component provides a modal dialog that can be used to display content in a larger view.
 * It uses the `useModalBig` hook to manage the modal's open state and content.
 * It also ensures that the modal is only mounted after the initial render to avoid hydration issues.
 *
 * @returns {JSX.Element | null} The rendered modal dialog or null if not mounted.
 */

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
