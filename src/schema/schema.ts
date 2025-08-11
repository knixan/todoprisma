import { z } from "zod";

export const TodoSchema = z.object({
  name: z.string(),
  desc: z.string(),
});
