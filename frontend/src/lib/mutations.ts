import type { LoadModelPayload } from "@/lib/app.types";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

const setModel = async (payload: LoadModelPayload) => {
  const response = await fetch(`${endpoint}/load_model`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error on set the model");
  }

  return response.text();
};

export { setModel };
