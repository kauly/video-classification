import { z } from "zod";

const inferenceFormSchema = z.object({
  confidence: z.coerce.number({
    required_error: "Confidence is required",
    invalid_type_error: "Confidence must be a number",
  }),
  iou: z.coerce.number({
    required_error: "IOU is required",
    invalid_type_error: "IOU must be a number",
  }),
});

export type InferenceFormValues = z.infer<typeof inferenceFormSchema>;

export { inferenceFormSchema };
