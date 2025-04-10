//  Modified mergeDeep with built-in deep copy

/**
 * 
 * @param target (does a json.parse(JSON.stringify(target))
 * @param source (matching partial of target object)
 * @returns new object
 *     
 * INFO: Usage Example
 *  const complexUpdate = {
      portionSizes: [4, 5],
      components: {
        0: { val: "updated one" },
        1: { val: "updated two" }
      }
    };
    setMyObjState((prev) => mergeDeep(prev, complexUpdate));
 * 
    OR for example in the context:
    updateRecipeData = (newData: Partial<PreCalculatedRecipeData>)
 */
export const mergeDeep = (target: any, source: any): any => {
  // Create a deep copy of the target as the first step
  let result = JSON.parse(JSON.stringify(target));

  if (source === null || typeof source !== "object") return source;

  // Handle arrays specifically
  if (Array.isArray(result) && Array.isArray(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const index = Number(key);
        if (!isNaN(index)) {
          result[index] = mergeDeep(result[index] || {}, source[key]);
        }
      }
    }
    return result;
  }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (result[key] && typeof result[key] === "object" && typeof source[key] === "object") {
        result[key] = mergeDeep(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
};

// INFO: Usage Example

/* 
import Button from "@/components/Button";
import React, { useState } from "react";

interface pageProps {}
type TObj = {
  portionSizes: number[];
  componentsNamesArray: string[];
  components: { val: string }[];
};

// Modified mergeDeep with built-in deep copy
const mergeDeep = (target: any, source: any): any => {
  // Create a deep copy of the target as the first step
  let result = JSON.parse(JSON.stringify(target));
  
  if (source === null || typeof source !== "object") return source;
  
  // Handle arrays specifically
  if (Array.isArray(result) && Array.isArray(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const index = Number(key);
        if (!isNaN(index)) {
          result[index] = mergeDeep(result[index] || {}, source[key]);
        }
      }
    }
    return result;
  }
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (result[key] && typeof result[key] === "object" && typeof source[key] === "object") {
        result[key] = mergeDeep(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
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
        1: { val: "four" } // Updates the second component
      }
    };
    
    setMyObject((prev) => mergeDeep(prev, update));
  };

  // Update multiple nested properties
  const handleComplexDeepUpdate = () => {
    const complexUpdate = {
      portionSizes: [4, 5],
      components: {
        0: { val: "updated one" },
        1: { val: "updated two" }
      }
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

*/
