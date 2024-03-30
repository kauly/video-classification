import { CapturedImage } from "./components/captured-image";
import { InferenceForm } from "./components/inference-form";
import { ModelForm } from "./components/model-form";
import { Toaster } from "./components/ui/toaster";
import { VideoForm } from "./components/video-form";
import { VideoPlayer } from "./components/video-player";

function App() {
  return (
    <div className="w-full h-screen bg-background text-foreground flex flex-col md:flex-row justify-center   py-8  gap-4">
      <div className="flex flex-col  justify-start gap-4 overflow-y-auto">
        <VideoPlayer />
        <CapturedImage />
        <canvas
          id="myCanvas"
          width={800}
          height={600}
          className="pointer-events-none"
        ></canvas>
      </div>
      <div className="overflow-x-auto flex flex-row md:flex-col gap-4 items-start">
        <VideoForm />
        <ModelForm />
        <InferenceForm />
      </div>
      <Toaster />
    </div>
  );
}

export { App };
