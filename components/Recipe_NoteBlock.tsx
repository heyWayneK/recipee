import React, { ReactNode, useState } from "react";
import DottedBorder from "./DottedBorder";
import TextLink from "./TextLink";

interface Recipe_NoteBlockProps {}
const Recipe_NoteBlock: React.FC<Recipe_NoteBlockProps> = () => {
  const [viewMore, setViewMore] = useState(false);
  const handleViewMore = () => setViewMore(!viewMore);
  return (
    <DottedBorder>
      <p className={viewMore ? "" : "line-clamp-3"}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of
        type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
        in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      {viewMore ? (
        <TextLink onClick={handleViewMore} className="">
          View Less
        </TextLink>
      ) : (
        <TextLink onClick={handleViewMore} className="">
          View More
        </TextLink>
      )}
    </DottedBorder>
  );
};

export default Recipe_NoteBlock;
