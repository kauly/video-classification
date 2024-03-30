import type {
  DetectPayload,
  DetectResponse,
  LoadModelPayload,
} from "./app.types";

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

const runDetect = async (payload: DetectPayload): Promise<DetectResponse> => {
  const response = await fetch(`${endpoint}/detect`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error on detect");
  }
  const res = await response.json();

  return res;
};

const uploadImage = async (payload: FormData): Promise<string> => {
  const response = await fetch(`${endpoint}/upload`, {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    throw new Error("Error on upload image");
  }
  const res = await response.text();

  return res;
};

export { setModel, runDetect, uploadImage };
