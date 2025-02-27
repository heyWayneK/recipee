"use client";
import React from "react";

import { Prisma } from "@prisma/client";
import { ValidateOptions } from "../_types/formGen_types";
import FormGen_Form_Table_DbCall2 from "../_components/Form_Table_DbCall";

/* EXAMPLE FIELDS_______________START
  SupplierSelect:
    id?: boolean
    customerId?: boolean
    name?: boolean
    vat?: boolean
    corporationNumber?: boolean
    logo?: boolean
    email?: boolean
    tel?: boolean
    cell?: boolean
    whatsapp?: boolean
    accountEmail?: boolean
    accountName?: boolean
    accountTel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
EXAMPLE FIELDS _______________END */

// SETUP FORM____________________START:
// ONE
const tableName = "supplier";
// TWO
const formFieldsToExcludeInTable: (keyof Prisma.SupplierSelect)[] = [
  "customerId",
  "corporationNumber",
  "logo",
  "email",
  "tel",
  "cell",
  "whatsapp",
  "accountEmail",
  "accountName",
  "accountTel",
  "createdAt",
  "updatedAt",
  "customer",
];
// THREE
type ValidationType = Partial<{
  [key in keyof Prisma.SupplierSelect]: any;
}>;

// FOUR
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
  vat: {
    label: "vatttt",
    type: "text",
    required: true,
    min: 3,
    max: 50,
    pattern: null,
    options: null,
    enum: null,
    error: null,
  },
  corporationNumber: {
    label: "Company Number",
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

const FormPage = () => {
  return <FormGen_Form_Table_DbCall2 tableName={tableName} formFieldsToExcludeInTable={formFieldsToExcludeInTable} model={formFieldsForEditUpdate} />;
};

export default FormPage;
