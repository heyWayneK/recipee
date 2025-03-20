import { type NextRequest, NextResponse } from "next/server"

// Define the type for your response data
type IngredientClassification = {
  id: string
  name: string
  category: string
  properties: {
    vegan: boolean
    glutenFree: boolean
    allergen: boolean
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ table: string }> }) {
  try {
    // Get the table parameter from the URL
    const { table } = await params

    // This is where you would typically fetch data from a database
    // based on the table parameter

    // For demonstration, we'll return mock data
    const mockData: IngredientClassification[] = [
      {
        id: "1",
        name: "Tomato",
        category: "Vegetable",
        properties: {
          vegan: true,
          glutenFree: true,
          allergen: false,
        },
      },
      {
        id: "2",
        name: "Milk",
        category: "Dairy",
        properties: {
          vegan: false,
          glutenFree: true,
          allergen: true,
        },
      },
      {
        id: "3",
        name: "Wheat Flour",
        category: "Grain",
        properties: {
          vegan: true,
          glutenFree: false,
          allergen: true,
        },
      },
    ]

    // You could use the table parameter to filter or select different data
    // For example, if table === 'vegan', you could filter for vegan ingredients

    return NextResponse.json({
      table,
      ingredients: mockData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    // Handle errors appropriately
    return NextResponse.json({ error: "Failed to fetch ingredient data" }, { status: 500 })
  }
}

