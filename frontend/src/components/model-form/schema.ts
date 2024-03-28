import { z } from "zod";

import { MODELS } from "@/lib/api.types";

const modelFormSchema = z.object({
  model_name: z.nativeEnum(MODELS, {
    required_error: "Please select a model",
  }),
});

export { modelFormSchema };
