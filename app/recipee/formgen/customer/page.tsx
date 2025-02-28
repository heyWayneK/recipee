"use client";
import React from "react";

import { Prisma } from "@prisma/client";
import { TableName } from "../_api/prismaCrud";
import { ValidateOptions } from "../_types/formGen_types";
import FormGen_Form_Table_DbCall2 from "../_components/Form_Table_DbCall2";

/* EXAMPLE FIELDS_______________START
  CustomerSelect:
 id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    address?: boolean
    logo?: boolean
    active?: boolean
    paymentOptions?: boolean
    contacts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ingredients?: boolean | Customer$ingredientsArgs<ExtArgs>
    suppliers?: boolean | Customer$suppliersArgs<ExtArgs>
    allergies?: boolean | Customer$allergiesArgs<ExtArgs>
    stocks?: boolean | Customer$stocksArgs<ExtArgs>
    stockLocations?: boolean | Customer$stockLocationsArgs<ExtArgs>
    recipeBooks?: boolean | Customer$recipeBooksArgs<ExtArgs>
    todos?: boolean | Customer$todosArgs<ExtArgs>
    sessions?: boolean | Customer$sessionsArgs<ExtArgs>
    roles?: boolean | Customer$rolesArgs<ExtArgs>
    StockMinimum?: boolean | Customer$StockMinimumArgs<ExtArgs>
    RecipeBackup?: boolean | Customer$RecipeBackupArgs<ExtArgs>
    RecipeBookIndex?: boolean | Customer$RecipeBookIndexArgs<ExtArgs>
    RecipeBookCollection?: boolean | Customer$RecipeBookCollectionArgs<ExtArgs>
    RecipeBookAccess?: boolean | Customer$RecipeBookAccessArgs<ExtArgs>
    TodoStatus?: boolean | Customer$TodoStatusArgs<ExtArgs>
    TodoDocument?: boolean | Customer$TodoDocumentArgs<ExtArgs>
    ConversationThread?: boolean | Customer$ConversationThreadArgs<ExtArgs>
    ProductionEvent?: boolean | Customer$ProductionEventArgs<ExtArgs>
    ProductionEventTask?: boolean | Customer$ProductionEventTaskArgs<ExtArgs>
    CostRules?: boolean | Customer$CostRulesArgs<ExtArgs>
    PackagingCosts?: boolean | Customer$PackagingCostsArgs<ExtArgs>
    OtherCosts?: boolean | Customer$OtherCostsArgs<ExtArgs>
    Markup?: boolean | Customer$MarkupArgs<ExtArgs>
    Recipe?: boolean | Customer$RecipeArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
EXAMPLE FIELDS _______________END */

// SETUP FORM____________________START:
// ONE
const tableName: TableName = "customers";
// TWO
const formFieldsToExcludeInTable: (keyof Prisma.CustomerSelect)[] = ["emailVerified", "address", "createdAt", "logo", "updatedAt", "CostRules", "active"];

// type ValidationType = Partial<{
//   [key in keyof Prisma.CustomerSelect]: any;
// }>;

// Example usage
const formFieldsForEditUpdate: Partial<Record<keyof Prisma.SupplierSelect, Omit<ValidateOptions, "dbName">>> = {
  name: {
    label: "Name",
    type: "hidden",
    required: true,
    min: 3,
    max: 50,
    pattern: null,
    options: null,
    enum: null,
    error: null,
  },
  email: {
    label: "Email",
    type: "text",
    required: true,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
      type: "text",
    },
    options: null,
    enum: null,
    min: null,
    max: null,
    error: null,
  },
};

const FormPage = () => {
  return <FormGen_Form_Table_DbCall2 tableName={tableName} formFieldsToExcludeInTable={formFieldsToExcludeInTable} model={formFieldsForEditUpdate} />;
};

export default FormPage;
