import connectDB from "@/lib/db";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: { id: string } }) {
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
  await connectDB();

  const { id } = await context.params;

  const deleted = await Todo.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
