"use client";
import React from "react";

import { Prisma } from "@prisma/client";
import { ValidateOptions } from "../_types/formGen_types";
import FormGen_Form_Table_DbCall2 from "../_components/Form_Table_DbCall";

// SETUP FORM____________________START:
/* EXAMPLE FIELDS_______________START
  IngredientsSelect:
 id?: boolean
    customerId?: boolean
    isDefault?: boolean
    name?: boolean
    nameOther?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    Component?: boolean | Ingredients$ComponentArgs<ExtArgs>
    _count?: boolean | IngredientsCountOutputTypeDefaultArgs<ExtArgs>
EXAMPLE FIELDS _______________END */

// SETUP FORM____________________START:

// ONE
const tableName = "ingredients";

// TWO
const formFieldsToExcludeInTable: (keyof Prisma.CustomerSelect)[] = ["emailVerified", "address", "createdAt", "CostRules", "active"];

type ValidationType = Partial<{
  [key in keyof Prisma.CustomerSelect]: any;
}>;

const formFieldsForEditUpdate: Partial<Record<keyof Prisma.SupplierSelect, Omit<ValidateOptions, "dbName">>> = {
  name: {
    label: "Name",
    type: "text",
    required: true,
    min: 3,
    max: 50,
    pattern: null,
    options: null,
    enum: null,
    error: null,
  },
};
// SETUP FORM____________________END:

const FormPage = () => {
  return <FormGen_Form_Table_DbCall2 tableName={tableName} formFieldsToExcludeInTable={formFieldsToExcludeInTable} model={formFieldsForEditUpdate} />;
};

export default FormPage;
