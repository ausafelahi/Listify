import connectDB from "@/lib/db";
import Todo from "@/models/Todo";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true, runValidators: true }
  );

  if (!updatedTodo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(updatedTodo);
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await context.params;

  const deleted = await Todo.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
