import { Result } from "./app.types";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

const getResults = async (): Promise<Result[]> => {
  const response = await fetch(`${endpoint}/results`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error("Error on get the results");
  }
  const res = await response.json();

  return res;
};

export { getResults };
