"use client";
import Button from "@/components/Button";
import { mergeDeep } from "@/libs/mergeDeep";
import React, { useState } from "react";

interface pageProps {}
type TObj = {
  portionSizes: number[];
  componentsNamesArray: string[];
  components: { val: string }[];
};

const Page: React.FC<pageProps> = () => {
  console.log("page LOADING************");

  let obj: TObj = {
    portionSizes: [1, 2],
    componentsNamesArray: ["test", "test2"],
    components: [{ val: "one" }, { val: "two" }],
  };
  const [myObject, setMyObject] = useState(obj);

  const handleUpdate = () => {
    setMyObject((prev) => ({
      ...prev,
      portionSizes: [2, 3],
    }));
  };

  // Using mergeDeep to update nested components
  const handleDeepUpdate = () => {
    const update = {
      components: {
        1: { val: "four" }, // Updates the second component
      },
    };

    setMyObject((prev) => mergeDeep(prev, update));
  };

  // Update multiple nested properties
  const handleComplexDeepUpdate = () => {
    const complexUpdate = {
      portionSizes: [4, 5],
      components: {
        0: { val: "updated one" },
        1: { val: "updated two" },
      },
    };

    setMyObject((prev) => mergeDeep(prev, complexUpdate));
  };

  return (
    <>
      <div className={`className p-1`}>{myObject.componentsNamesArray.join(", ")}</div>
      <div className={`className p-1`}>{myObject.portionSizes.join(", ")}</div>
      <div className={`className p-1`}>{myObject.components[0].val}</div>
      <div className={`className p-1`}>{myObject.components[1].val}</div>
      <div className={`className p-1`}>
        <Button text="update portion" onClick={handleUpdate} />
      </div>
      <div className={`className p-1`}>
        <Button text="update component" onClick={handleDeepUpdate} />
      </div>
      <div className={`className p-1`}>
        <Button text="complex update" onClick={handleComplexDeepUpdate} />
      </div>
    </>
  );
};

export default Page;
