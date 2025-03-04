import React from "react";
import DottedBorder from "./DottedBorder";
import Image from "next/image";

interface Recipe_ImageBlockProps {}
const Recipe_ImageBlock: React.FC<Recipe_ImageBlockProps> = () => {
  return (
    <DottedBorder className="p-0">
      <div style={{ position: "relative", width: "100%", height: "300px", overflow: "hidden", borderRadius: "20px" }}>
        {/* TODO: Get sizes working  to optimise serverside image resize */}
        <Image
          src="/food/FC7-350g Pesto Napoli Chicken & Low fat Cream 750x450_1x.jpg"
          priority
          fill
          sizes="(max-width: 400px) 100vw, (max-width: 1200px) 40vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="Pesto Napoli Chicken"
        />
      </div>
    </DottedBorder>
  );
};

export default Recipe_ImageBlock;
