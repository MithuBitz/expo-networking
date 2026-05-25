import { db } from "@/lib/db";

type Ctx = { id: string };

// We use _req because we dont need request params
export async function GET(_req: Request, { id }: Ctx) {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM users_data WHERE id = ?",
      args: [parseInt(id, 10)],
    });
    return Response.json(result.rows);
  } catch (error) {
    console.log(error);
    return Response.json({
      error: "Failed to fetch users",
      status: 500,
    });
  }
}

export async function PATCH(request: Request, { params }: Ctx) {}

export async function PUT(request: Request, { params }: Ctx) {}

export async function DELETE(request: Request, { params }: Ctx) {}
