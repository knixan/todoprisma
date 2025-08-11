"use client";
import { todo } from "@/generated/prisma";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { deleteTodo, toggleTodo } from "@/actions/todo";
import { Switch } from "./ui/switch";

export default function TodoItem({ todo }: { todo: todo }) {
  const date = new Date(todo.createdAt).toDateString();
  const completeDate = new Date(todo.updatedAt).toLocaleDateString();
  return (
    <div className="flex pt-4">
      <Card className="max-w-2/3 w-full mx-auto">
        <CardHeader>
          <CardTitle>{todo.name}</CardTitle>
          <CardDescription className="italic">
            {todo.desc && todo.desc}
          </CardDescription>
          <CardAction className="flex items-center gap-2">
            <Switch
              checked={todo.compleated}
              onCheckedChange={async () =>
                await toggleTodo(todo.id, todo.compleated)
              }
            />

            <Button
              variant={"destructive"}
              onClick={async () => {
                await deleteTodo(todo.id);
              }}
            >
              Delete
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {todo.compleated ? (
            <p>Completed at {completeDate}</p>
          ) : (
            <p>Added: {date}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
