import { InferenceForm } from "./components/inference-form";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="w-full h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto pt-40">
        <InferenceForm />
      </div>
      <Toaster />
    </div>
  );
}

export { App };
