import { z } from "zod";

export const messageSchema = z.object({
    content: z
        .string()
        .min(1, "input empty")
        .max(500, "Maximum 500 characters"),
});

export type MessageFormValues = z.infer<typeof messageSchema>;