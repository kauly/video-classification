import { PropsWithChildren, useCallback } from "react";
import ReactPlayer from "react-player/file";

import { Card, CardContent } from "@/components/ui/card";
import { useAppActions, useVideoUrl } from "@/lib/state";

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className="aspect-video md:aspect-none md:w-[760px] md:h-[340px]">
    {children}
  </div>
);

function VideoPlayer() {
  const videoUrl = useVideoUrl();
  const { setVideoInstance, setDimensions } = useAppActions();

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
            url={videoUrl}
            ref={getInstance}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { VideoPlayer };
