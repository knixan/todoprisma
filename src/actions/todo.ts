"use server";

import { prisma } from "@/lib/db";
import { TodoSchema } from "@/schema/schema";
import { revalidatePath } from "next/cache";
import z from "zod";

type TodoValues = Partial<z.infer<typeof TodoSchema>>;

export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function addTodo(prevoiusState: unknown, formData: FormData) {
  const originalValues = Object.fromEntries(formData) as TodoValues;
  const result = TodoSchema.safeParse(originalValues);

  if (!result.success) {
    return {
      status: result.success,
      error: z.treeifyError(result.error).properties,
      values: originalValues,
    };
  } else {
    await prisma.todo.create({
      data: {
        name: result.data.name,
        desc: result.data.desc,
      },
    });
    revalidatePath("/");
    return {
      status: result.success,
      error: result.error,
      values: originalValues,
    };
  }
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
}

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      compleated: !completed,
    },
  });
  revalidatePath("/");
}
