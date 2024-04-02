import { InferenceForm } from "./components/inference-form";
import { MainTabs } from "./components/main-tabs";
import { ModelForm } from "./components/model-form";
import { useWebSocket } from "./components/providers/socker-provider";
import { Toaster } from "./components/ui/toaster";
import { VideoForm } from "./components/video-form";

function App() {
  useWebSocket();
  return (
    <div className="w-full bg-background text-foreground flex flex-col md:flex-row justify-center px-4 md:px-0 py-8 gap-4 overflow-y-auto">
      <div className="md:min-w-[780px]">
        <MainTabs />
      </div>
      <div className="flex items-center flex-col gap-4">
        <VideoForm />
        <ModelForm />
        <InferenceForm />
      </div>
      <Toaster />
    </div>
  );
}

export { App };
