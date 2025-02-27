"use client";

import { DynamicTable } from "@/app/recipee/formgen/_components/FormGen_DynamicTable";

const sampleData = [
  { id: "1", name: "John Doe", age: 30, city: "New York" },
  { id: "2", name: "Jane Smith", age: 25, city: "Los Angeles" },
  { id: "3", name: "Bob Johnson", age: 35, city: "Chicago" },
  { id: "4", name: "Alice Brown", age: 28, city: "Houston" },
];
// const sampleData = [
//   { name: "John Doe", age: 30, city: "New York" },
//   { name: "Jane Smith", age: 25, city: "Los Angeles" },
//   { name: "Bob Johnson", age: 35, city: "Chicago" },
//   { name: "Alice Brown", age: 28, city: "Houston" },
// ];

export default function Home() {
  const handleRowSelect = (selectedIds: string[]) => {
    console.log("Selected rows:", selectedIds);
  };

  const handleAction = (selectedIds: string[]) => {
    console.log("Performing action on:", selectedIds);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Table Example</h1>
      <DynamicTable data={sampleData} onRowSelect={handleRowSelect} onAction={handleAction} />
    </main>
  );
}
