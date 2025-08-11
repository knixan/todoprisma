"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import TodoForm from "./todo-form";
import { useState } from "react";

export default function TodoDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new todo</DialogTitle>
          <DialogDescription>
            Make a new todo here here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <TodoForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
