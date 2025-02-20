import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CustomerFormData } from "./_formSchema/customerSchema";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: CustomerFormData = await request.json();
    const customer = await prisma.customer.create({ data: body });
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create customer" }, { status: 400 });
  }
}

//__________________________________

// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import type { CustomerFormData } from "@/libs/formSchemas/customerSchems";

// const prisma = new PrismaClient();

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
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

//____________________

// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { type CustomerFormData, validateCustomer } from "@/libs/formSchemas/customerSchems";

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const customers = await prisma.customer.findMany();
//     return NextResponse.json(customers);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body: CustomerFormData = await request.json();
//     const errors = validateCustomer(body);
//     if (Object.keys(errors).length > 0) {
//       return NextResponse.json({ errors }, { status: 400 });
//     }
//     const customer = await prisma.customer.create({ data: body });
//     return NextResponse.json(customer);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create customer" }, { status: 400 });
//   }
// }

//_______________________

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const customers = await prisma.customer.findMany();
//     return NextResponse.json(customers);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const validatedData = customerSchema.parse(body);
//     const customer = await prisma.customer.create({ data: validatedData });
//     return NextResponse.json(customer);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create customer" }, { status: 400 });
//   }
// }

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const customers = await prisma.customer.findMany();
//     return NextResponse.json(customers);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const validatedData = customerSchema.parse(body) as CustomerCreateInput;
//     const customer = await prisma.customer.create({ data: validatedData });
//     return NextResponse.json(customer);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create customer" }, { status: 400 });
//   }
// }
