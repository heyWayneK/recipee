import React, { useState, useEffect } from "react";

// For this self-contained example, we'll inject the keyframes animation via a style tag.
// In a real-world Tailwind setup, you would add this to your `tailwind.config.js` file.
const animationStyle = `
  @keyframes progress-animation {
    from {
      stroke-dashoffset: 352; /* Circumference of the circle (2 * PI * 56) */
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .progress-circle-animate {
    animation: progress-animation 3s linear forwards;
  }
`;

// --- Configuration ---
const MESSAGES = ["Finding Products...", "Filtering Nutritionals...", "Designing Meal Plan...", "Ready."];
const DURATION = 3000; // Total duration in milliseconds
const MESSAGE_INTERVAL = DURATION / MESSAGES.length;

// --- Component Prop Types ---
interface LoadingModalProps {
  /**
   * Controls whether the modal is visible or not.
   */
  isOpen: boolean;
  /**
   * A callback function that is called when the modal's 3-second duration is complete.
   */
  onClose: () => void;
}

/**
 * A responsive loading modal component that displays a progress circle and cycles through messages.
 * It automatically calls the `onClose` callback after a 3-second duration.
 */
const Modal_ProgressMealPlan: React.FC<LoadingModalProps> = ({ isOpen, onClose }) => {
  const [currentMessage, setCurrentMessage] = useState(MESSAGES[0]);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // This effect handles the entire lifecycle of the modal's animation and text changes.
    if (isOpen) {
      // When the modal opens, reset the animation and text.
      setCurrentMessage(MESSAGES[0]);
      // Changing the key of the progress circle element forces a re-render and restarts the CSS animation.
      setAnimationKey((prevKey) => prevKey + 1);

      // Set up an interval to cycle through the messages.
      let messageIndex = 1;
      const messageIntervalId = setInterval(() => {
        if (messageIndex < MESSAGES.length) {
          setCurrentMessage(MESSAGES[messageIndex]);
          messageIndex++;
        }
      }, MESSAGE_INTERVAL);

      // Set up a timeout to close the modal after the full duration.
      const hideModalTimeoutId = setTimeout(() => {
        onClose();
      }, DURATION);

      // Cleanup function: This is crucial to prevent memory leaks.
      // It runs when the component unmounts or when `isOpen` changes from true to false.
      return () => {
        clearInterval(messageIntervalId);
        clearTimeout(hideModalTimeoutId);
      };
    }
  }, [isOpen, onClose]); // Rerun the effect if `isOpen` or `onClose` changes.

  // Use CSS transitions for a smooth fade-in/fade-out effect.
  const modalVisibilityClasses = isOpen ? "opacity-100 visible" : "opacity-0 invisible";

  return (
    <>
      <style>{animationStyle}</style>
      <div id="loading-modal" className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${modalVisibilityClasses}`}>
        {/* Modal Content */}
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 space-y-4 w-[90vw] h-[90vw] sm:w-[40vw] sm:h-[40vw] md:w-[35vw] md:h-[35vw] lg:w-[25vw] lg:h-[25vw] max-w-sm max-h-sm">
          {/* Progress Circle SVG */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              {/* Background Circle */}
              <circle cx="60" cy="60" r="56" fill="none" stroke="#e6e6e6" strokeWidth="8" />
              {/* Progress Circle */}
              <circle
                key={animationKey} // The key change triggers the animation restart.
                className="transform -rotate-90 origin-center progress-circle-animate"
                cx="60"
                cy="60"
                r="56"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="352"
                strokeDashoffset="352"
              />
            </svg>
          </div>

          {/* Loading Text */}
          <p id="loading-text" className="text-gray-700 font-medium text-center text-lg">
            {currentMessage}
          </p>
        </div>
      </div>
    </>
  );
};

export default Modal_ProgressMealPlan;
