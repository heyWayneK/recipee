"use client";

import { useState, useEffect } from "react";
import { CustomerForm } from "@/components/CustomerForm";
import { useCustomerCrud } from "@/hooks/useCustomerCrud";
import type { CustomerFormData } from "@/app/recipee/formgen/_formSchemas/customerSchema";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerFormData[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormData | null>(null);
  const { deleteCustomer, error } = useCustomerCrud();

  useEffect(() => {
    if (selectedCustomer) {
      console.log("CUSTOMER FOUND");
    } else {
      console.log("NO CUSTOMER FOUND");
    }
    setSelectedCustomer(null);
    fetchCustomers();
  }, []);

  const setUrlParam = (param: number) => {
    console.log(param);
  };

  const fetchCustomers = async () => {
    const response = await fetch("/api/customers");
    const data = await response.json();
    setCustomers(data);
  };

  const fetchCustomer = async (id: number) => {
    // WK added
    const response = await fetch(`/api/customers/${id}`);
    const data = await response.json();
    setCustomers(data);
  };

  const handleEditCustomer = async (customer: CustomerFormData) => {
    fetchCustomer(customer.id);
    setSelectedCustomer(customer);
  };
  const handleCreateSuccess = () => {
    fetchCustomers();
    setSelectedCustomer(null);
  };

  const handleUpdateSuccess = () => {
    fetchCustomers();
    setSelectedCustomer(null);
  };

  const handleDelete = async (id: number) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers {`${selectedCustomer?.name}`}</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{selectedCustomer ? `Edit Customer ${selectedCustomer.id} ` : "Create New Customer"}</h2>
        <CustomerForm initialData={selectedCustomer} onSuccess={selectedCustomer ? handleUpdateSuccess : handleCreateSuccess} />
      </div>

      {!selectedCustomer && (
        <>
          <h2 className="text-xl font-semibold mb-2">Customer List</h2>
          <ul className="space-y-2">
            {customers.length > 0 &&
              customers.map((customer: CustomerFormData) => (
                <li key={customer.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{customer.name}</span>
                  <div>
                    {/* <button onClick={() => setSelectedCustomer(customer)} className="text-blue-600 hover:text-blue-800 mr-2"> */}
                    <button onClick={() => handleEditCustomer(customer)} className="text-blue-600 hover:text-blue-800 mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(customer.id!)} className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { CustomerForm } from "@/components/CustomerForm";
// import { useCustomerCrud } from "@/hooks/useCustomerCrud";
// import type { CustomerFormData } from "@/libs/formSchemas/customerSchems";
// import Loading from "@/components/Loading";

// export default function CustomersPage() {
//   const [customers, setCustomers] = useState<CustomerFormData[]>([]);
//   const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormData | null>(null);
//   const { deleteCustomer, error } = useCustomerCrud();

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     const response = await fetch("/api/customers");
//     const data = await response.json();
//     setCustomers(data);
//     console.log("FETCH NEW CLIENT");
//   };

//   const handleCreateSuccess = () => {
//     fetchCustomers();
//     setSelectedCustomer(null);
//   };

//   const handleUpdateSuccess = () => {
//     fetchCustomers();
//     setSelectedCustomer(null);
//   };

//   const handleDelete = async (id: number) => {
//     await deleteCustomer(id);
//     fetchCustomers();
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Customers</h1>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">{selectedCustomer ? "Edit Customer" : "Create New Customer"}</h2>
//         <CustomerForm initialData={selectedCustomer} onSuccess={selectedCustomer ? handleUpdateSuccess : handleCreateSuccess} />
//       </div>

//       <h2 className="text-xl font-semibold mb-2">Customer List</h2>
//       <ul className="space-y-2">
//         <Suspense fallback={<Loading />}>
//           {customers.map((customer) => (
//             <li key={customer.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
//               <span>
//                 {customer.name}
//                 {`(${customer.id})`}
//               </span>
//               <div>
//                 <button
//                   onClick={() => {
//                     console.log("&&&&&&&&&", customer);
//                     setSelectedCustomer(customer);
//                   }}
//                   className="text-blue-600 hover:text-blue-800 mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-800">
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </Suspense>
//       </ul>
//     </div>
//   );
// }

//________________________________

// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { CustomerForm } from "@/components/CustomerForm";
// import { useCustomerCrud } from "@/hooks/useCustomerCrud";
// import type { CustomerFormData } from "@/libs/formSchemas/customerSchems";
// import Loading from "@/components/Loading";

// export default function CustomersPage() {
//   const [customers, setCustomers] = useState<CustomerFormData[]>([]);
//   const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormData | null>(null);
//   const { deleteCustomer, error } = useCustomerCrud();

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     const response = await fetch("/api/customers");
//     const data = await response.json();
//     setCustomers(data);
//   };

//   const handleCreateSuccess = () => {
//     fetchCustomers();
//     setSelectedCustomer(null);
//   };

//   const handleUpdateSuccess = () => {
//     fetchCustomers();
//     setSelectedCustomer(null);
//   };

//   const handleDelete = async (id: number) => {
//     await deleteCustomer(id);
//     fetchCustomers();
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Customers</h1>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">{selectedCustomer ? "Edit Customer" : "Create New Customer"}</h2>
//         <CustomerForm initialData={selectedCustomer} onSuccess={selectedCustomer ? handleUpdateSuccess : handleCreateSuccess} />
//       </div>

//       <h2 className="text-xl font-semibold mb-2">Customer List</h2>
//       <Suspense fallback={<Loading />}>
//         <ul className="space-y-2">
//           {customers.map((customer) => (
//             <li key={customer.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
//               <span>{customer.name}</span>
//               <div>
//                 <button onClick={() => setSelectedCustomer(customer)} className="text-blue-600 hover:text-blue-800 mr-2">
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-800">
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </Suspense>
//     </div>
//   );
// }
