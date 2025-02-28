// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { CustomerFormData } from "../_formSchema/customerSchema";

// const prisma = new PrismaClient();

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     // if (!params.id) return null;
//     // console.log("_____________ ", params.id);
//     const customer = await prisma.customer.findUnique({
//       where: { id: Number.parseInt(params.id) },
//     });
//     if (!customer) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }
//     return NextResponse.json(customer);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 });
//   }
// }

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const body: CustomerFormData = await request.json();
//     const customer = await prisma.customer.update({
//       where: { id: Number.parseInt(params.id) },
//       data: body,
//     });
//     return NextResponse.json(customer);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update customer" }, { status: 400 });
//   }
// }

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//   try {
//     await prisma.customer.delete({
//       where: { id: Number.parseInt(params.id) },
//     });
//     return NextResponse.json({ message: "Customer deleted successfully" });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
//   }
// }
