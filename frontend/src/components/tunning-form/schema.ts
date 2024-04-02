import { z } from "zod";

const tunningFormSchema = z.object({
  confidence: z.coerce
    .number({
      required_error: "Confidence is required",
      invalid_type_error: "Confidence must be a number",
    })
    .gt(0)
    .lte(1),
  iou: z.coerce
    .number({
      required_error: "IOU is required",
      invalid_type_error: "IOU must be a number",
    })
    .gt(0)
    .lte(1),
});

export type TunningFormValues = z.infer<typeof tunningFormSchema>;

export { tunningFormSchema };
