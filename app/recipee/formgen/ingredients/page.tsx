"use client";
import React from "react";
import { TableName } from "../_types/formGen_setup";
import { Prisma } from "@prisma/client";
import { ValidateOptions } from "../_types/formGen_types";
import FormGen_Form_Table_DbCall2 from "../_components/Form_Table_DbCall2";
import { Validate } from "react-hook-form";

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
const tableName: TableName = "ingredients";

// TWO
const formFieldsToExcludeInTable: (keyof Prisma.ingredientsSelect)[] = ["names_alt", "name_orig", "customer_id", "is_default", "created_at", "updated_at", "customer", "component", "_count"];

// type ValidationType = Partial<{
//   [key in keyof Prisma.CustomerSelect]: any;
// }>;

const formFieldsForEditUpdate: Partial<Record<keyof Prisma.ingredientsSelect, Partial<ValidateOptions>>> = {
  name: {
    label: "Name",
    type: "text",
    required: true,
    min: 3,
    max: 50,
    pattern: null,
    options: [],
    enum: null,
    error: null,
    maxLength: null,
    minLength: null,
  },
  secondary_category: {
    label: "Secondary Category",
    type: "radio",
    required: true,
    min: 3,
    max: 50,
    pattern: null,
    options: ["one", "two", "three"].map((item) => ({ value: item, label: item })),
    enum: null,
    error: null,
    maxLength: null,
    minLength: null,
  },
  primary_category: {
    label: "Secondary Category",
    type: "checkbox",
    required: true,
    min: 3,
    max: 50,
    pattern: null,
    options: ["one", "two", "three"].map((item) => ({ value: item, label: item })),
    enum: null,
    error: null,
    maxLength: null,
    minLength: null,
  },
};
// SETUP FORM____________________END:

const FormPage = () => {
  return <FormGen_Form_Table_DbCall2 tableName={tableName} formFieldsToExcludeInTable={formFieldsToExcludeInTable} model={formFieldsForEditUpdate} />;
};

export default FormPage;

// INGREDIENT SHAPE from Prisma
/*
model ingredients {
  id          Int       @id @default(autoincrement())
  name        String
  name_orig   String?
  names_alt   String?
  customer    customer? @relation(fields: [customer_id], references: [id])
  customer_id Int?
  is_default  Boolean?  @default(false)
  translation Json?

  primary_category    ingredient_category_primary? @relation(fields: [primary_category_id], references: [id])
  primary_category_id Int?

  secondary_category String?

  raw_to_prepped_yields raw_to_prepped_yields[]
  cooked_yields         prepped_to_cooked_yields[]
  dry_cooked_yields     dry_cooked_yields[]
  component             component[]
  ingredients_nutrition ingredients_nutrition[]
  created_at            DateTime                   @default(now())
  updated_at            DateTime                   @updatedAt

  dietary_classification    dietary_classification? @relation(fields: [dietary_classification_id], references: [id])
  dietary_classification_id Int?

  kosher    ingredients_religious_certification? @relation(name: "KosherRelation", fields: [kosher_id], references: [id])
  kosher_id Int?

  halal    ingredients_religious_certification? @relation(name: "HalalRelation", fields: [halal_id], references: [id])
  halal_id Int?

  confidence         Float?
  allergy_ingredient allergy_ingredient[]
  ai_model           String?
  WebhookQueue       WebhookQueue[]
  allergy            allergy?             @relation(fields: [allergyId], references: [id])
  allergyId          Int?
  deleted            Boolean              @default(false)
}

 */
