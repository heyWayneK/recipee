"use client";
import React, { useCallback } from "react";
import { DynamicFormComponent } from "../../FormGen_DynamicForm";
import Loading from "@/components/Loading";
import ErrorPage from "../../../ErrorPage";
import type { FieldValues } from "react-hook-form";
import type { ApiResponse, DynamicObjectArray, DynamicTableComponentProps, FetchPayload, WithCrudProps } from "../../../_types/formGen_types";
import { TableName, getAll, update, deleteOne, create, getOne, uploadImage } from "../../../_api/prismaCrud";
// import { delete_api, getAll_api, getOne_api, update_api } from "../_api/FormGen_api";
// FUTURE: Get Typescrrpt types ffrom supabase
// create table public.movies (
//   id bigint generated always as identity primary key,
//   name text not null,
//   data jsonb null
// );

// INFO: DATE FORMATS: "2025-02-20" or new Date ("2025-02-20")

export function FormGen_Form_Table_DbCall(DynamicTableComponent: React.ComponentType<DynamicTableComponentProps>, tableName: TableName, formFieldsToExcludeInTable: string[]) {
  return function WithCrud({ model }: WithCrudProps) {
    // ITEMS : View List Items
    const [items, setItems] = React.useState<DynamicObjectArray | null>(null);
    const [isError, setIsError] = React.useState<Partial<ApiResponse> | null>({ error: false });
    const [selectedItem, setSelectedItem] = React.useState<{ id: number } | null>(null);
    const [showForm, setShowForm] = React.useState<boolean | null>(false);

    // CALLED BY useEffect()
    // VERSION 2
    const fetchItems = useCallback(async () => {
      try {
        const fetchedItems: DynamicObjectArray = await getAll(tableName);
        // TODO: Having to stringifyParse to flatten DATE OBJECTS
        // TODO: Need to find a better way to handle DATE OBJECTS
        const jsonFetch = JSON.parse(JSON.stringify(fetchedItems));
        // setItems(fetchedItems);
        setItems(jsonFetch);
      } catch (error) {
        // Handle the error
        setIsError({
          ok: false,
          error: true,
          status: error.status || 500, // Use error.status, fallback to 500
          statusText: error.message || "Failed to fetch items",
          url: tableName, // or table name
        });
      }
    }, []);
    /*  VERSION 1
    const fetchItems = useCallback(async () => {
      const fetchedItems: Response = await getAll_api();
      const { ok, status, statusText, url } = fetchedItems;
      const json = await fetchedItems.json();
      ok ? setItems(json) : setIsError({ error: true, status, statusText, url });
    }, []);
    */

    // USEFFECT: FETCH VIEW-EDIT LIST
    React.useEffect(() => {
      fetchItems();
    }, [fetchItems]);

    // BUTTON HANDLERS
    async function handleSaveNewRow(data: Record<string, any>) {
      try {
        // CREATE NEW VAR TO SEPERATE IMAGE FROM DATA
        const dataWithoutImageFile: Record<string, any> = {};
        // SEPERATE
        for (const [key, value] of data.entries()) {
          if (key !== "image") {
            dataWithoutImageFile[key] = value;
          }
        }

        // IF IMAGE ADD IMAGE BACK INTO DATA AFTER UPLOAD
        const imageFile = data.get("image");
        if (imageFile instanceof File) {
          const imageUrl = await uploadImage(imageFile);
          dataWithoutImageFile.image = imageUrl; // Add the image URL to the data object
        }

        console.log("INSERT New FIELDVALUES______", data);
        // TODO:enable
        await create(tableName, dataWithoutImageFile);
        await fetchItems();
        setSelectedItem(null); // to show NEW form
        setShowForm(false);
      } catch (error) {
        throw new Error(`Failed to insert new row: ${error}`);
      }
    }

    async function handleUpdate(data: FieldValues) {
      console.log("UPDATE New FIELDVALUES______", data);
      if (selectedItem && selectedItem?.id!) {
        await update(tableName, selectedItem?.id!, data);
        // await update_api(selectedItem?.id!, selectedItem);
        await fetchItems();
        setSelectedItem(null); // to show NEW form
        setShowForm(false);
      }
    }

    async function handleDelete(id: number) {
      await deleteOne(tableName, id);
      await fetchItems();
    }

    async function handleEdit(id: number) {
      // Fetch
      // TODO: Add validation and warnings
      const item = await getOne(tableName, id);
      setShowForm(true);
      // TODO: WAYNE ************** TESTING
      // INITIAL DATA ************* TESTING
      // ************************** TESTING
      let testItem = {
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

      testItem = {};
      setSelectedItem({ ...item, ...testItem });

      // **************************TESTING
      // **************************TESTING
      // TODO: USe this after testing
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
        <h4 className=" capitalize">
          {tableName} : {selectedItem ? "Edit" : "Create New"}
        </h4>

        {/* NEW ROW FORM or EDIT EXISTING ROW */}
        {showForm && <DynamicFormComponent model={model} onSubmit={selectedItem ? handleUpdate : handleSaveNewRow} initialData={selectedItem} handleToggleForm={handleToggleForm} />}

        {/* VIEW LIST */}
        {showForm || (
          <DynamicTableComponent
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showForm={showForm}
            handleToggleForm={handleToggleForm}
            tableName={tableName}
            formFieldsToExcludeInTable={formFieldsToExcludeInTable}
          />
        )}
      </div>
    );
  };
}

export default FormGen_Form_Table_DbCall;
