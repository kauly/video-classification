import { InferenceForm } from "./components/inference-form";
import { MainTabs } from "./components/main-tabs";
import { ModelForm } from "./components/model-form";
import { Toaster } from "./components/ui/toaster";
import { VideoForm } from "./components/video-form";

function App() {
  return (
    <div className="w-full bg-background text-foreground flex flex-col md:flex-row justify-center px-4 md:px-0 py-8 gap-4 overflow-y-auto">
      <MainTabs />
      <div className="flex items-center flex-col gap-4 ">
        <VideoForm />
        <ModelForm />
        <InferenceForm />
      </div>
      <Toaster />
    </div>
  );
}

export { App };
