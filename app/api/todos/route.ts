import { auth } from "@clerk/nextjs/server";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getDevAuthUser } from "@/lib/devAuth";

export async function GET() {
  const { userId } = await getDevAuthUser();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const getTodo = await Todo.find({}).sort({ createdAt: -1 });

  return NextResponse.json(getTodo);
}

export async function POST(req: Request) {
  const { userId } = await getDevAuthUser();

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
