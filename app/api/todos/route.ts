import { auth } from "@clerk/nextjs/server";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, dueDate } = await req.json();

  if (!title || title.trim().length < 3) {
    return NextResponse.json(
      {
        message: "Title should be at least 3 characters long",
      },
      { status: 400 }
    );
  }

  await connectDB();

  const createTodo = await Todo.create({
    title: title.trim(),
    description: description ? description.trim() : "",
    dueDate: dueDate ? new Date(dueDate) : null,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json(createTodo, { status: 201 });
}
