import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import Button from "./Button";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBig = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const toggleModel = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="overflow-y-auto bg-black border border-[#222222] max-h-[90vh] max-w-[650px] w-full">
        <DialogHeader>
          <DialogTitle className="text-white">Model Title</DialogTitle>
          <DialogDescription className="text-white">Any content comes here.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <div onClick={toggleModel}>
              <Button text="Close" />
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBig;
