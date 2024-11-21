import { z } from "zod";

const postPatchSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(128, { message: "記事のタイトルは128文字以内で入力してください" }),
  content: z.any().optional(),
});

type postPatchSchemaType = z.infer<typeof postPatchSchema>;

export { postPatchSchema };
export type { postPatchSchemaType };
