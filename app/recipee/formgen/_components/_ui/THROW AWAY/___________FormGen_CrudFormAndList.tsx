"use client";
import React, { useCallback } from "react";
import { DynamicFormComponent } from "./FormGen_DynamicForm";
import { delete_api, getAll_api, getOne_api, update_api } from "../_api/FormGen_api";
import Loading from "@/components/Loading";
import ErrorPage from "../ErrorPage";
import type { FieldValues } from "react-hook-form";
import type { ApiResponse, DynamicObjectArray, DynamicTableComponentProps, FetchPayload, WithCrudProps } from "../_types/formGen_types";

// INFO: DATE FORMATS: "2025-02-20" or new Date ("2025-02-20")

export function FormGen_CrudFormAndList(DynamicTableComponent: React.ComponentType<DynamicTableComponentProps>) {
  return function WithCrud({ model }: WithCrudProps) {
    // ITEMS : View List Items
    const [items, setItems] = React.useState<DynamicObjectArray | null>(null);
    const [isError, setIsError] = React.useState<Partial<ApiResponse> | null>({ error: false });
    const [selectedItem, setSelectedItem] = React.useState<{ id: string } | null>(null);
    const [showForm, setShowForm] = React.useState<boolean | null>(false);

    // CALLED BY useEffect()
    const fetchItems = useCallback(async () => {
      const fetchedItems: Response = await getAll_api();
      const { ok, status, statusText, url } = fetchedItems;
      const json = await fetchedItems.json();
      ok ? setItems(json) : setIsError({ error: true, status, statusText, url });
    }, []);

    // USEFFECT: FETCH VIEW-EDIT LIST
    React.useEffect(() => {
      fetchItems();
    }, [fetchItems]);

    // BUTTON HANDLERS
    async function handleSaveNewRow(data: FetchPayload) {
      console.log("Save New FIELDVALUES______", data);
      // TODO:enable
      // await create(data);
      // await fetchItems();
    }

    async function handleUpdate(data: FieldValues) {
      console.log("UPDATE New FIELDVALUES______", data);
      if (selectedItem && selectedItem?.id!) {
        await update_api(selectedItem?.id!, selectedItem);
        await fetchItems();
        setSelectedItem(null);
      }
    }

    async function handleDelete(id: string) {
      await delete_api(id);
      await fetchItems();
    }

    async function handleEdit(id: string) {
      // Fetch
      // TODO: Add validation and warnings
      const item = await getOne_api(id);
      setShowForm(true);
      // TODO: WAYNE ************** TESTING
      // INITIAL DATA ************* TESTING
      // ************************** TESTING
      const testItem = {
        ...item,
        name: "from Test",
        active: "1",
        startDate: "2025-02-12",
        endDate: "2025-02-13",
        logo: ["https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"],
        start: "2025-02-12",
        end: "2025-02-13",
        paymentOptions: "Bank Transfer",
        test1: ["check1", "check2", "check3"],
      };
      console.log("SET TEST DATA", testItem);
      setSelectedItem({ ...item, ...testItem });
      // **************************TESTING
      // **************************TESTING
      // ORIGINAL:
      // setSelectedItem(item);
    }

    function handleToggleForm() {
      setSelectedItem(null);
      setShowForm((prev) => !prev);
    }

    // LOADING AND ERROR HANDLING
    if (!isError.error && items === null) return <Loading />;
    if (isError.error) return <ErrorPage error={`${isError.statusText} (${isError.status}) url:${isError.url}`} />;

    //  SHOW DYNAMIC FORM AND/OR VIEW-EDIT TABLE
    return (
      <div className="grid gap-10">
        {/* HEADING */}
        <h4>
          {selectedItem ? "Edit" : "Create New"} {tableName}]
        </h4>

        {/* NEW ROW FORM or EDIT EXISTING ROW */}
        {showForm && <DynamicFormComponent model={model} onSubmit={selectedItem ? handleUpdate : handleSaveNewRow} initialData={selectedItem} handleToggleForm={handleToggleForm} />}

        {/* VIEW LIST */}
        {showForm || <DynamicTableComponent items={items} onEdit={handleEdit} onDelete={handleDelete} showForm={showForm} handleToggleForm={handleToggleForm} />}
      </div>
    );
  };
}

export default FormGen_CrudFormAndList;
