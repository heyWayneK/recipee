import React, { Suspense } from "react";
import Pill from "./Pill";
import Loading from "./Loading";

interface Row_ElementsListProps {
  data: any;
  className?: string;
}
const Row_ElementsList: React.FC<Row_ElementsListProps> = ({
  className = "",
  data,
}) => {
  const createMultiDimensionalArray = (): (string | number)[][] => {
    const rows = 13;
    const cols = 5;
    const tblArr = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.floor(Math.random() * 100))
    );
    console.log(tblArr);
    return tblArr;
  };

  const tableData = createMultiDimensionalArray();

  return (
    <div className={`${className} p-1 justify-items-center`}>
      <Pill className="px-10" tone="dark">
        {data.uiElements[1].name}
      </Pill>
      <div className="container mx-auto p-4 justify-items-center">
        <h1 className="text-2xl font-bold mb-4">5x13 Table</h1>
        <Suspense fallback={<Loading />}>
          <Table data={tableData} />
        </Suspense>
      </div>
    </div>
  );
};

interface TableProps {
  data: (string | number)[][];
}
const Table: React.FC<TableProps> = async ({ data }) => {
  await new Promise((res) => setTimeout(res, 2000));
  return (
    <table className="border-collapse border border-gray-400">
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-gray-400 p-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Row_ElementsList;
