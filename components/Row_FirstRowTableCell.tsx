import React from "react";
import Table_Cell from "./Table_Cell";

interface Row_FirstRowTableCellProps {
  translatedName: string;
}
const Row_FirstRowTableCell: React.FC<Row_FirstRowTableCellProps> = ({ translatedName }) => {
  return <Table_Cell firstCol={true}>{translatedName}</Table_Cell>;
};

export default Row_FirstRowTableCell;
