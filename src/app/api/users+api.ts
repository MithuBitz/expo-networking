import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM users_data",
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

export async function POST(request: Request) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return Response.json({
      error: "Name and Email are required",
      status: 400,
    });
  }
  try {
    const result = await db.execute({
      sql: "INSERT INTO users_data (name, email) VALUES (?,?)",
      args: [name, email],
    });
    return Response.json(
      { id: result.lastInsertRowid, name, email, success: true },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({
      error: "Failed to create user",
      status: 500,
    });
  }
}
