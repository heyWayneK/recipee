// --- Typed Helper Functions ---

// GETTER: Safely retrieves a value. The return type is `any` because the path is dynamic.
/**
 * SETTER: Uses a generic <T> to return an object of the same type it received.
/]**
 * USAGE obj={recipeData}
 * path="data.servings"
 * value="any value"
 *
 * @param path
 * @param value
 * @returns
 * 
 * @param obj 
 * @param path 
 * @returns 
 */
export const getValueByPath = (obj: object, path: string): any => {
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  return keys.reduce((acc: any, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

// SETTER: Uses a generic <T> to return an object of the same type it received.
/**
 * USAGE obj={recipeData}
 * path="data.servings"
 * value="any value"
 *
 * @param path
 * @param value
 * @returns
 */
export const setValueByPath = <T extends object>(obj: T, path: string, value: any): T => {
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  // Using a structured clone for a better deep copy than JSON.stringify
  const newObj = structuredClone(obj);

  let current: any = newObj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined) {
      const nextKey = keys[i + 1];
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key];
  }

  // Coerce value to number if the original was a number
  const originalValue = getValueByPath(obj, path);
  const finalValue = typeof originalValue === "number" ? Number(value) : value;

  current[keys[keys.length - 1]] = finalValue;
  return newObj;
};
