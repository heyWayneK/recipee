import Loading from "@/components/Loading";
import ErrorPage from "../ErrorPage";
import { TableName } from "../_api/prismaCrud";
import { DynamicFormComponent } from "./FormGen_DynamicForm";
import useTableCrud from "../_hook/useCrud";
import React from "react";
import { DynamicTableComponent } from "../_util/FormGen_TableFunctions";

// Updated Component Usage
function FormGen_Form_Table_DbCall2({
  tableName,
  formFieldsToExcludeInTable,
  model,
}: {
  //   DynamicTableComponent: React.ComponentType<DynamicTableComponentProps>;
  tableName: TableName;
  formFieldsToExcludeInTable: string[];
  model: any; // Replace with proper type
}) {
  const { items, isError, selectedItem, showForm, handleSaveNewRow, handleUpdate, handleDelete, handleEdit, handleToggleForm } = useTableCrud(tableName);

  if (!isError.error && items === null) return <Loading />;
  if (isError.error) return <ErrorPage error={`${isError.statusText} (${isError.status}) url:${isError.url}`} />;

  return (
    <div className="grid gap-10">
      <h4 className="capitalize">
        {tableName} : {selectedItem ? "Edit" : "Create New"}
      </h4>

      {showForm && <DynamicFormComponent model={model} onSubmit={selectedItem ? handleUpdate : handleSaveNewRow} initialData={selectedItem} handleToggleForm={handleToggleForm} />}

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
}

export default FormGen_Form_Table_DbCall2;
