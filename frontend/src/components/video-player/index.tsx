import { FabricImage } from "fabric";
import { useCallback } from "react";
import ReactPlayer from "react-player/file";

import { Card, CardContent } from "@/components/ui/card";
import {
  useAppActions,
  useCanvasInstance,
  useVideoInstance,
  useVideoUrl,
} from "@/lib/state";
import { SOCKET_EVENTS, socket } from "../providers/socker-provider";
import { DetectPayload } from "@/lib/app.types";

function VideoPlayer() {
  const videoUrl = useVideoUrl();
  const videoInstance = useVideoInstance();
  const canvasInstance = useCanvasInstance();
  const { setVideoInstance, setDimensions } = useAppActions();

  const handleProgress = useCallback(() => {
    if (!canvasInstance || !videoInstance) return;
    if (videoInstance.paused || videoInstance.ended) return;

    const dimensions = {
      width: videoInstance.clientWidth,
      height: videoInstance.clientHeight,
    };
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoInstance, 0, 0, dimensions.width, dimensions.height);
    const image = new FabricImage(canvas, { ...dimensions });
    const imgUrl = image.toDataURL({ format: "jpeg" });
    const payload: DetectPayload = {
      confidence: 0.7,
      iou: 0.5,
      image_path: imgUrl.replace(/^data:image\/?[A-z]*;base64,/, ""),
    };
    socket.emit(SOCKET_EVENTS.DetectRequest, payload);
    canvasInstance.setDimensions({
      height: videoInstance.clientHeight,
      width: videoInstance.clientWidth,
    });
    canvasInstance.add(image);
  }, [canvasInstance, videoInstance]);

  const getInstance = useCallback(
    (node: ReactPlayer) => {
      if (node) {
        const videoTag = node.getInternalPlayer() as HTMLVideoElement;
        setDimensions({
          height: videoTag.clientHeight,
          width: videoTag.clientWidth,
        });
        setVideoInstance(videoTag);
      }
    },
    [setVideoInstance, setDimensions]
  );

  return (
    <Card className="w-full h-full pt-4">
      <CardContent>
        <div className="player-wrapper">
          <ReactPlayer
            controls
            className="react-player"
            width="100%"
            height="100%"
            progressInterval={150}
            url={videoUrl}
            onProgress={handleProgress}
            ref={getInstance}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { VideoPlayer };
