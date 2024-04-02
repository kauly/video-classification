import { VideoPlayer } from "@/components/video-player";
import { PreviewCard } from "../preview-card";

function MainContent() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <VideoPlayer />
      </div>
      <div className="flex-1">
        <PreviewCard />
      </div>
    </div>
  );
}
export { MainContent };
