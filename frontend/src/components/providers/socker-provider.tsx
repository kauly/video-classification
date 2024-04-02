import { DetectResponse, Result } from "@/lib/app.types";
import { handleDetectResponse } from "@/lib/canvas";
import { useAppActions, useCanvasInstance } from "@/lib/state";
import { useCallback, useEffect } from "react";
import { io } from "socket.io-client";

const endpoint = import.meta.env.VITE_SOCKET_ENDPOINT;

export enum SOCKET_EVENTS {
  Connect = "connect",
  Disconnect = "disconnect",
  DetectRequest = "detect_request",
  DetectResponse = "detect_response",
  ResultResponse = "result_response",
}

export const socket = io(endpoint);

function useWebSocket() {
  const { setIsSocketReady, setTableData } = useAppActions();
  const canvasInstance = useCanvasInstance();

  const detectResponse = useCallback(
    (data: DetectResponse) => {
      if (canvasInstance) {
        handleDetectResponse({ data, canvas: canvasInstance });
      }
    },
    [canvasInstance]
  );

  const resultsResponse = useCallback(
    (data: Result) => {
      setTableData(data);
    },
    [setTableData]
  );

  const connectedEvent = useCallback(() => {
    setIsSocketReady(true);
  }, [setIsSocketReady]);

  const disconnectedEvent = useCallback(() => {
    setIsSocketReady(false);
  }, [setIsSocketReady]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.Connect, connectedEvent);
    socket.on(SOCKET_EVENTS.Disconnect, disconnectedEvent);
    socket.on(SOCKET_EVENTS.DetectResponse, detectResponse);
    socket.on(SOCKET_EVENTS.ResultResponse, resultsResponse);

    return () => {
      socket.off(SOCKET_EVENTS.Connect, connectedEvent);
      socket.off(SOCKET_EVENTS.Disconnect, disconnectedEvent);
      socket.off(SOCKET_EVENTS.DetectResponse, detectResponse);
      socket.off(SOCKET_EVENTS.ResultResponse, resultsResponse);
    };
  }, [connectedEvent, disconnectedEvent, detectResponse, resultsResponse]);
}

export { useWebSocket };
