interface languageTypes {
  [key: string]: string;
}
interface languageProps {
  [key: string]: languageTypes;
}

/**
 USAGE: {getTextTranslation("my_word")}
 */

// INFO: "key" should be lowercase and without spaces (Caps will be ignored)
export const language: languageProps = {
  assembly: { EN: "Assembly", FR: "FR-ASSEMBLY", SP: "SP-ASSEMBLY" },
  save: { EN: "Save", FR: "FR-Save", SP: "SP-Save" },
  last_saved: { EN: "Last Saved", FR: "FR-Last Saved", SP: "SP-last Saved" },
  quantity: { EN: "quantity", FR: "FR-Last Saved", SP: "SP-last Saved" },
  metric: { EN: "metric", FR: "FR-metric", SP: "SP-metric" },
  component: { EN: "component", FR: "FR-component", SP: "SP-component" },
  /**
To Add
metric
last saved
jan
feb
mar
apr
may
juns
jul
aug
sep
oct
nov
dec
components
component_assembly
sub_recipe
components_sub_total -> use: components sub total

quantity

plating
ingredient_cost
packaging_cost
packaging_costs
other_cost
costs_sub_total
sales_price_(ex_vat)
sales_price_(incl_vat)
you_have_feedback

add_component
add_step
hide_prices
show_prices

ingredient
instruction
qty
cost

form_error

// FORM LABELS - Textfields etc
name
email
address
paymentoptions
contacts

 */
};
