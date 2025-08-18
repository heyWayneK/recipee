import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

// Define a type for the allowed models to provide type safety.
type AllowedModels = "recipe";

export async function PATCH(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { model, id, field, value } = body;

    if (!model || !id || !field || value === undefined) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Whitelist of allowed models to prevent arbitrary model updates.
    const allowedModels: AllowedModels[] = ["recipe"];
    if (!allowedModels.includes(model)) {
      return new NextResponse(`Model '${model}' is not allowed for updates.`, { status: 403 });
    }

    // The model name from the request is used to access the corresponding Prisma client.
    // This is a dynamic but controlled way to perform the update.
    // We cast `prisma` to `any` to allow dynamic model access.
    const prismaModel = (prisma as any)[model];

    if (!prismaModel) {
      return new NextResponse(`Invalid model: ${model}`, { status: 400 });
    }

    const updatedRecord = await prismaModel.update({
      where: {
        // Assuming the ID field is always `uuid` for the models we allow.
        // If different models use different ID fields (e.g., `id`), this needs to be more flexible.
        uuid: id,
      },
      data: {
        [field]: value,
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error("[UPDATE_FIELD_API]", error);
    // It's good practice to hide detailed error messages in production.
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
