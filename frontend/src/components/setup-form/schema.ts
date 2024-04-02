import { z } from "zod";

import { MODELS } from "@/lib/app.types";

const setupFormSchema = z.object({
  model_name: z.nativeEnum(MODELS, {
    required_error: "Please select a model",
  }),
});

export type SetupFormValues = z.infer<typeof setupFormSchema>;

export { setupFormSchema };
