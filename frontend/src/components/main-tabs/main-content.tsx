import { ImageCard } from "@/components/image-card";
import { VideoPlayer } from "@/components/video-player";
import { useCapturedImage } from "@/lib/state";

function MainContent() {
  const capturedImage = useCapturedImage();
  return (
    <div className="flex flex-col gap-4 flex-grow">
      <VideoPlayer />
      <ImageCard
        title="Captured Frame"
        description="Click on the `Capture a frame` button to display an image here"
        imgSrc={capturedImage}
      />
    </div>
  );
}
export { MainContent };
