import { InferenceForm } from "./components/inference-form";
import { ModelForm } from "./components/model-form";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="w-full h-screen bg-background text-foreground flex justify-center mt-40 items-start">
      <div className="w-full overflow-x-auto flex flex-col md:flex-row gap-4 md:justify-center">
        <ModelForm />
        <InferenceForm />
      </div>
      <Toaster />
    </div>
  );
}

export { App };
