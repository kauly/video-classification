import { useCallback } from "react";
import ReactPlayer from "react-player/file";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { SOCKET_EVENTS, socket } from "@/hooks/use-web-socket";
import { DetectPayload } from "@/lib/app.types";
import { getImageFromVideo } from "@/lib/canvas";
import {
  useAppActions,
  useCanvasInstance,
  useSocketStatus,
  useTunningOptions,
  useVideoInstance,
  useVideoUrl,
} from "@/lib/state";

function VideoPlayer() {
  const { toast } = useToast();
  const videoUrl = useVideoUrl();
  const videoInstance = useVideoInstance();
  const canvasInstance = useCanvasInstance();
  const isSocketReady = useSocketStatus();
  const tunning = useTunningOptions();
  const { setVideoInstance, setIsVideoPlaying } = useAppActions();

  const handlePlay = () => {
    try {
      if (!isSocketReady) {
        throw Error("The socket is offline");
      }
      setIsVideoPlaying(true);
    } catch (err) {
      toast({
        variant: "destructive",
        description: `${err}`,
      });
    }
  };

  const handleProgress = useCallback(() => {
    if (!canvasInstance || !videoInstance || !isSocketReady) return;
    if (videoInstance.paused || videoInstance.ended) return;

    try {
      const dimensions = {
        width: videoInstance.clientWidth,
        height: videoInstance.clientHeight,
      };

      // get an image from the video with equal dimensions
      const { canvasImage, imgSrc } = getImageFromVideo({
        dimensions,
        videoInstance,
      });

      const payload: DetectPayload = {
        confidence: tunning.confidence,
        iou: tunning.iou,
        image_path: imgSrc.replace(/^data:image\/?[A-z]*;base64,/, ""),
      };

      // send the image and params for inference
      socket.emit(SOCKET_EVENTS.DetectRequest, payload);

      // it's necessary to update the canvas dimensions
      // because the video and the canvas are initiate practically at the same time
      // I'm doing it here to avoid some sort of race condition
      canvasInstance.setDimensions({
        height: videoInstance.clientHeight,
        width: videoInstance.clientWidth,
      });
      // update preview canvas
      canvasInstance.add(canvasImage);
    } catch (err) {
      toast({
        variant: "destructive",
        description: `Video Progress Error: ${err}`,
      });
    }
  }, [toast, canvasInstance, videoInstance, isSocketReady, tunning]);

  const getInstance = useCallback(
    (node: ReactPlayer) => {
      if (node) {
        const videoTag = node.getInternalPlayer() as HTMLVideoElement;

        setVideoInstance(videoTag);
      }
    },
    [setVideoInstance]
  );

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Video Player</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="player-wrapper">
          <ReactPlayer
            controls
            className="react-player"
            width="100%"
            height="100%"
            progressInterval={250}
            url={videoUrl}
            onProgress={handleProgress}
            onPlay={handlePlay}
            ref={getInstance}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { VideoPlayer };
