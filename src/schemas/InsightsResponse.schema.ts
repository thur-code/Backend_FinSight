import * as z from "zod";

export const InsightSchema = z.object({
  type: z.enum(["warning", "info", "positive"]),
  message: z.string(),
});

export const InsightsResponseSchema = z.object({
  insights: z.array(InsightSchema),
});

export type InsightsResponseDTO = z.infer<typeof InsightsResponseSchema>;
