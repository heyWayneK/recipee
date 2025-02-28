import { getTextTranslation } from "@/libs/utils";
import { DynamicTable } from "../_components/FormGen_DynamicTable";
import { DynamicObjectArray, DynamicTableComponentProps, TableItem } from "../_types/formGen_types";
import React from "react";

// CREATE TABLE
export const createTableRowsWithEditDeleteMultiSelect = (items: DynamicObjectArray, onEdit: (id: any) => any, onDelete: (id: any) => any): TableItem[] => {
  if (!items) console.error("ERROR createTableRowsWithEditDeleteMultiSelect - no content");

  return items.map((item: { id?: number }) => {
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
export const DynamicTableComponent: React.FC<DynamicTableComponentProps> = ({ items, onEdit, onDelete, showForm, handleToggleForm, formFieldsToExcludeInTable }) => {
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
      //  items.map((item) => {<div>{item}</div>}
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
      // <span>HELLOE</span>
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
