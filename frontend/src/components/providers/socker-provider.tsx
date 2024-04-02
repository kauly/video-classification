import { DetectResponse } from "@/lib/app.types";
import { handleDetectResponse } from "@/lib/canvas";
import { useAppActions, useCanvasInstance } from "@/lib/state";
import { useCallback, useEffect } from "react";
import { io } from "socket.io-client";

const endpoint = import.meta.env.VITE_SOCKET_ENDPOINT;

export enum SOCKET_EVENTS {
  DetectRequest = "detect_request",
  DetectResponse = "detect_response",
  ResultResponse = "result_response",
}

export const socket = io(endpoint);

function useWebSocket() {
  const { setIsSocketReady } = useAppActions();
  const canvasInstance = useCanvasInstance();

  const detectResponse = useCallback(
    (data: DetectResponse) => {
      if (canvasInstance) {
        handleDetectResponse({ data, canvas: canvasInstance });
      }
    },
    [canvasInstance]
  );

  useEffect(() => {
    socket.on("connect", setIsSocketReady);
    socket.on(SOCKET_EVENTS.DetectResponse, detectResponse);
  }, [setIsSocketReady, detectResponse]);
}

export { useWebSocket };
