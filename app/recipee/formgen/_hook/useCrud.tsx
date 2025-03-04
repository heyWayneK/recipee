import { useState, useEffect, useCallback } from "react";
import { ApiResponse, DynamicObjectArray } from "../_types/formGen_types";
import { TableName, create, deleteOne, getAll, getOne, update } from "../_api/prismaCrud";
import { FieldValues } from "react-hook-form";

// The custom hook
export default function useTableCrud(tableName: TableName) {
  const [items, setItems] = useState<DynamicObjectArray | []>([]);
  const [isError, setIsError] = useState<Partial<ApiResponse>>({ error: false });
  // const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<FieldValues>();
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch items
  const fetchItems = useCallback(async () => {
    try {
      const fetchedItems: DynamicObjectArray = await getAll(tableName);
      // Flatten date objects (TODO: Improve date handling)
      const jsonFetch = await JSON.parse(JSON.stringify(fetchedItems));
      setItems(jsonFetch);
    } catch (error: any) {
      setIsError({
        ok: false,
        error: true,
        status: error.status || 500,
        statusText: error.message || "Failed to fetch items",
        url: tableName,
      });
    }
  }, [tableName]);

  // Fetch items on mount or when tableName changes
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // CRUD Handlers
  const handleSaveNewRow = async (data: FieldValues) => {
    try {
      // const dataWithoutImageFile: Record<string, any> = {};
      // for (const [key, value] of data.entries()) {
      //   console.log("DATA", key, value);
      //   if (key !== "image") {
      //     dataWithoutImageFile[key] = value;
      //   }
      // }

      // const imageFile = data.get("image");
      // if (imageFile instanceof File) {
      //   const imageUrl = await uploadImage(imageFile);
      //   dataWithoutImageFile.image = imageUrl;
      // }

      // console.log("INSERT New FIELDVALUES______", dataWithoutImageFile);

      await create(tableName, data);
      // await create(tableName, dataWithoutImageFile);
      await fetchItems();
      setSelectedItem(undefined);
      setShowForm(false);
    } catch (error) {
      setIsError({ error: true, statusText: "Waynes error - useCrud.tsx - handleSaveNewRow" });
      throw new Error(`Failed to insert new row: ${error}`);
    }
  };

  const handleUpdate = async (data: FieldValues) => {
    if (selectedItem?.id) {
      await update(tableName, selectedItem.id, data);
      await fetchItems();
      setSelectedItem(undefined);
      setShowForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteOne(tableName, id);
    await fetchItems();
  };

  const handleEdit = async (id: number) => {
    const item = await getOne(tableName, id);
    setShowForm(true);
    setSelectedItem(item); // Use this instead of test data for production
  };

  const handleToggleForm = () => {
    setSelectedItem(undefined);
    setShowForm((prev) => !prev);
  };

  return {
    items,
    isError,
    selectedItem,
    showForm,
    fetchItems,
    handleSaveNewRow,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleToggleForm,
  };
}
