"use client";
import Modal_ProgressMealPlan from "@/components/Modal_ProgressMealPlan";
import React, { ReactNode, useState } from "react";

interface pageProps {
  //   children: ReactNode;
  className?: string;
}

const Page: React.FC<pageProps> = ({ className = "" }) => {
  const [isModalOpen, setModalOpen] = useState(true);

  // Function to handle closing the modal.
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to handle opening the modal.
  const handleShowModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
      {/* Button to re-trigger the modal for testing */}
      <button
        onClick={handleShowModal}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Show Loading Modal
      </button>

      {/* The LoadingModal component instance */}
      <Modal_ProgressMealPlan isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Page;
