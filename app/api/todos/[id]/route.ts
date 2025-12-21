import connectDB from "@/lib/db";
import { getDevAuthUser } from "@/lib/devAuth";
import Todo from "@/models/Todo";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { userId } = await getDevAuthUser();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const { title, description, dueDate, status } = await req.json();

  const updateFields: any = { updatedAt: new Date() };

  if (title !== undefined) {
    if (!title || title.trim().length < 3) {
      return NextResponse.json(
        { message: "Title should be at least 3 characters long" },
        { status: 400 }
      );
    }
    updateFields.title = title.trim();
  }
  if (description !== undefined) updateFields.description = description.trim();
  if (dueDate !== undefined)
    updateFields.dueDate = dueDate ? new Date(dueDate) : null;
  if (status !== undefined) {
    if (!["pending", "completed"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }
    updateFields.status = status;
  }
  await connectDB();

  try {
    const updateTodo = await Todo.findOneAndUpdate({ _id: id }, updateFields, {
      new: true,
    });

    if (!updateTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updateTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { message: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { userId } = await getDevAuthUser();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await connectDB();

  try {
    const deleteTodo = await Todo.findOneAndDelete({ _id: id });
    if (!deleteTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { message: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
