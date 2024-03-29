import { useCallback } from "react";
import ReactPlayer from "react-player/file";

import { useAppActions, useVideoUrl } from "@/lib/state";
import { Card } from "../ui/card";

function VideoPlayer() {
  const videoUrl = useVideoUrl();
  const { setVideoInstance } = useAppActions();

  const getInstance = useCallback(
    (node: ReactPlayer) => {
      if (node) {
        setVideoInstance(node);
      }
    },
    [setVideoInstance]
  );

  return (
    <Card className="p-4">
      <ReactPlayer controls url={videoUrl} ref={getInstance} />
    </Card>
  );
}

export { VideoPlayer };
