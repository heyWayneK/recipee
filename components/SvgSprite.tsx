import React from "react";

interface SvgSpriteProps {
  size: number;
  iconName: allowedIcon | "";
  className?: string;
}

// TODO: EXAMPLE: TAILWIND MERGE
// import { tailwindMerge } from "@/utils/tailwindMerge";
// className={tailwindMerge("mb-2 p-3 overflow-hidden w-full rounded-3xl border border-dotted border-slate-600 shadow-md grid grid-cols-1 justify-center items-stretch", className)}

export type allowedIcon = (typeof allowedIcons)[number];

// These come from the public/assets/sprite.svg ids
// See Preview File: public/assets/sprites preview.html
// Icons come from Gogle Material Icons, converted in vercel
// See instructions in sprites preview.html
const allowedIcons = [
  "hamburger",
  "123",
  "alarm",
  "arrow_drop_down",
  "calendar_today",
  "category",
  "check_circle",
  "database_search",
  "done_outline",
  "egg_alt",
  "event",
  "event_note",
  "favorite",
  "filter_list",
  "home",
  "hourglass_top",
  "nutrition",
  "radio_button_checked",
  "search",
  "skillet",
  "add_circle",
  "add_task",
  "assignment_add",
  "attach_file",
  "audio_file",
  "check_box_outline_blank",
  "checklist",
  "close",
  "delete",
  "document_search",
  "error",
  "finance",
  "fingerprint",
  "grid_on",
  "grocery",
  "help",
  "image",
  "info",
  "label",
  "lightbulb",
  "local_dining",
  "lock",
  "lock_open",
  "menu_book",
  "microwave_gen",
  "note_add",
  "open_in_full",
  "open_in_new",
  "oven",
  "photo_camera",
  "picture_as_pdf",
  "post_add",
  "print",
  "refresh",
  "report",
  "restaurant",
  "send",
  "send_to_mobile",
  "share",
  "speech_to_text",
  "table",
  "task_alt",
  "toggle_off",
  "toggle_on",
  "video_file",
  "visibility",
  "visibility_lock",
  "visibility_off",
  "warning",
  "arrow_drop_up",
  "more_horiz",
  "more_vert",
  "settings",
  "edit",
  "save",
  "circle",
  "radio_button_unchecked",
] as const;

const SvgSprite: React.FC<SvgSpriteProps> = ({ size = 20, iconName, className = "" }) => {
  return (
    <svg width={size} height={size} className={className}>
      <use xlinkHref={`/assets/sprite.svg#${iconName}`}></use>
    </svg>
  );
};

export default SvgSprite;

// TODO: Does Sprite exists
// function doesSvgSpriteExist(name) {
//   // Create a temporary SVG element
//   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//   const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

//   // Set the href attribute to the sprite reference
//   use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `/assets/sprite.svg#${name}`);

//   // Append the use element to the SVG
//   svg.appendChild(use);

//   // Append the SVG to the document body temporarily
//   document.body.appendChild(svg);

//   // Check if the sprite exists by checking its bounding box
//   const bbox = use.getBBox();

//   // Remove the temporary SVG from the document
//   document.body.removeChild(svg);

//   // Return true if width and height are greater than zero, indicating existence
//   return bbox.width > 0 && bbox.height > 0;
// }

// // Usage example
// const spriteExists = doesSvgSpriteExist('my-icon');
// console.log(`Sprite exists: ${spriteExists}`);
