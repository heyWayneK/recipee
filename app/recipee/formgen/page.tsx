"use client";
import React from "react";
import { FormGen_CrudFormAndList } from "./_components/FormGen_CrudFormAndList";
import { DynamicTable } from "./_components/DynamicTable";
import { formFieldsForEditUpdate, formFieldsToExcludeInTable } from "./_data/customer";
import { getTextTranslation } from "@/libs/utils";
import { type DynamicObjectArray, type DynamicTableComponentProps, type TableItem } from "./_types/formGen_types";

//  CREATE FORM PAGE WITH CRUD FUNCTIONALITY
const FormPage: React.FC<DynamicTableComponentProps> = () => {
  const FormGen_CRUD = FormGen_CrudFormAndList(createCrudViewTableWithHeader);
  return <FormGen_CRUD model={formFieldsForEditUpdate} />;
};

export default FormPage;

// CREATE TABLE
const createTableRowsWithEditDeleteMultiSelect = (items: DynamicObjectArray, onEdit: (id: string) => any, onDelete: (id: string) => any): TableItem[] => {
  if (!items) console.error("ERROR createTableRowsWithEditDeleteMultiSelect - no content");

  return items.map((item: { id?: string }) => {
    // IMPORTANT TO DESTRUCTURE ID (so multiple rows can be selected)
    const { id, ...rest } = item; // Separate id from the rest of the properties
    const tableItem: TableItem = {
      // IF NO ID, USE NULL VALUE - so a checkbox is not shown.
      id: id !== undefined ? id.toString() : null,
      ...rest,

      // CREATE EDIT BUTTON
      edit: (
        <button className="bg-slate-200 px-2 py-1 hover:bg-slate-400 active:bg-slate-50" onClick={() => onEdit(id)}>
          {getTextTranslation("Edit")}
        </button>
      ),

      // CREATE DELETE BUTTON
      delete: <button onClick={() => onDelete(id)}>{getTextTranslation("Delete")}</button>, // Non-null assertion (!)
    };

    return tableItem;
  });
};

// CREATE CRUD VIEW LIST WITH MULTI-SELECT, EDIT, DELETE BUTTONS
const createCrudViewTableWithHeader: React.FC<DynamicTableComponentProps> = ({ items, onEdit, onDelete, showForm, handleToggleForm }) => {
  // GET ID OF SELECTED ROWS
  const handleRowSelect = (selectedIds: string[]) => {
    console.log("Selected rows for Multi Row functionality:", selectedIds);
  };

  // APPLY ACTION TO MULTISELECT
  const handleAction = (selectedIds: string[]) => {
    console.log("Performing action on:", selectedIds);
  };

  // ARE THERE FORM FIELDS TO EXCLUDE?
  if (formFieldsToExcludeInTable.length > 0) {
    // EXLUDE ROWS if in formFieldsToExcludeInTable[]
    const newObject = (obj: {}) => Object.fromEntries(Object.entries(obj).filter(([key]) => !formFieldsToExcludeInTable.includes(key)));

    let cleanedItems: DynamicObjectArray = [];
    for (const obj of items) {
      cleanedItems.push(newObject(obj));
    }
    // RETURN CLEANED ITEM {}
    return (
      <DynamicTable
        data={createTableRowsWithEditDeleteMultiSelect(cleanedItems, onEdit, onDelete)}
        onRowSelect={handleRowSelect}
        onAction={handleAction}
        showForm={showForm}
        handleToggleForm={handleToggleForm}
      />
    );
  } else {
    // RETURN ORIGINAL ITEM {}
    return (
      <DynamicTable
        data={createTableRowsWithEditDeleteMultiSelect(items, onEdit, onDelete)}
        onRowSelect={handleRowSelect}
        onAction={handleAction}
        showForm={showForm}
        handleToggleForm={handleToggleForm}
      />
    );
  }
};
