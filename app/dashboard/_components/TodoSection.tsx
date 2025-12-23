"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export type Todo = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

const TodoSection = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    if (title.trim().length < 3) return;

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const newTodo = await res.json();

      setTodos((prev) => [newTodo, ...prev]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create todo", err);
    }
  };

  const updateTodo = async () => {
    if (!editingTodo) return;

    if (editingTodo.title.trim().length < 3) return;

    try {
      const res = await fetch(`/api/todos/${editingTodo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingTodo.title,
          description: editingTodo.description,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      setTodos((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );

      setEditingTodo(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  const toggleStatus = async (todo: Todo) => {
    const newStatus = todo.status === "pending" ? "completed" : "pending";

    try {
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Start by Making Todo List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button className="w-full" onClick={createTodo}>
            Add Todo
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Todo History</h3>

        {loading && <p className="text-sm text-muted-foreground">Loading...</p>}

        {!loading && todos.length === 0 && (
          <p className="text-sm text-muted-foreground">No todos yet.</p>
        )}

        {todos.map((todo) => (
          <Card key={todo._id}>
            <CardContent className="flex justify-between items-start py-4">
              <div className="space-y-1">
                <p className="font-medium">{todo.title}</p>
                {todo.description && (
                  <p className="text-sm text-muted-foreground">
                    {todo.description}
                  </p>
                )}
                <Badge
                  variant={todo.status === "pending" ? "secondary" : "default"}
                >
                  {todo.status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => toggleStatus(todo)}>
                  {todo.status === "pending" ? "Complete" : "Undo"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingTodo(todo)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>

          {editingTodo && (
            <div className="space-y-3">
              <Input
                value={editingTodo.title}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, title: e.target.value })
                }
              />
              <Textarea
                value={editingTodo.description}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    description: e.target.value,
                  })
                }
              />
              <Button className="w-full" onClick={updateTodo}>
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoSection;
