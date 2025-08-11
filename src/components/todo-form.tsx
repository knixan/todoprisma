"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useActionState, useEffect } from "react";
import { addTodo } from "@/actions/todo";
import { toast } from "sonner";

interface TodoFormProps {
  onSuccess: () => void;
}

function ErrorList({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null;
  return (
    <ul className="text-red-500 text-sm mt-1 list-disc list-inside">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}

export default function TodoForm({ onSuccess }: TodoFormProps) {
  const [state, formAction, isPending] = useActionState(addTodo, null);
  useEffect(() => {
    if (state?.status) {
      toast("Success");
      onSuccess();
    }
  }, [state?.status, onSuccess]);
  return (
    <form action={formAction}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name-1">Task</Label>
          <Input
            id="name-1"
            name="name"
            placeholder="Write a name of the task"
            defaultValue={state?.values.name}
            disabled={isPending}
          />
          <ErrorList errors={state?.error?.name?.errors} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="desc-1">Description</Label>
          <Input
            id="desc-1"
            name="desc"
            placeholder="Write a description"
            defaultValue={state?.values.desc}
            disabled={isPending}
          />
          <ErrorList errors={state?.error?.desc?.errors} />
        </div>
      </div>
      <DialogFooter className="pt-4">
        <DialogClose asChild>
          <Button variant="outline" disabled={isPending}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
