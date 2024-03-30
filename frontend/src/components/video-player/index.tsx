import { useCallback } from "react";
import ReactPlayer from "react-player/file";

import { Card } from "@/components/ui/card";
import { useAppActions, useVideoUrl } from "@/lib/state";

function VideoPlayer() {
  const videoUrl = useVideoUrl();
  const { setVideoInstance, setDimensions } = useAppActions();

  const getInstance = useCallback(
    (node: ReactPlayer) => {
      if (node) {
        const videoTag = node.getInternalPlayer() as HTMLVideoElement;
        console.log("🚀 ~ VideoPlayer ~ videoTag:", videoTag);
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
    <Card className="p-4">
      <div className="aspect-w-16 aspect-h-9 md:aspect-none">
        <ReactPlayer controls url={videoUrl} ref={getInstance} />
      </div>
    </Card>
  );
}

export { VideoPlayer };
