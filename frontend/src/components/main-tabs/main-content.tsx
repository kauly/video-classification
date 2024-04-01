import { ImageCard } from "@/components/image-card";
import { VideoPlayer } from "@/components/video-player";
import { useCapturedImage } from "@/lib/state";

function MainContent() {
  const capturedImage = useCapturedImage();
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <VideoPlayer />
      </div>
      <div className="flex-1">
        <ImageCard
          title="Captured Frame"
          description="Click on the `Capture a frame` button to display an image here"
          imgSrc={capturedImage}
        />
      </div>
    </div>
  );
}
export { MainContent };
