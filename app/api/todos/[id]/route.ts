import connectDB from "@/lib/db";
import Todo from "@/models/Todo";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await req.json();

  await connectDB();

  const updateTodo = await Todo.findByIdAndUpdate(
    id,
    {
      ...body,
      updatedAt: new Date(),
    },
    { new: true }
  );

  if (!updateTodo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(updateTodo);
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await connectDB();

  const deleteTodo = await Todo.findByIdAndDelete(id);

  if (!deleteTodo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
