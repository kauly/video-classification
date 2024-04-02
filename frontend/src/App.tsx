import { Toaster } from "@/components/ui/toaster";
import { WizardTabs } from "@/components/wizard-tabs";
import { VideoPlayer } from "@/components/video-player";
import { PreviewCard } from "@/components/preview-card";
import { ResultsTable } from "@/components/results-table";
import { SocketStatus } from "@/components/socket-status";
import { useWebSocket } from "@/hooks/use-web-socket";

function App() {
  useWebSocket();
  return (
    <main className="w-full mx-auto px-4 md:px-0 py-8 md:max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section id="socket-status" className="md:col-span-3 order-first">
          <SocketStatus />
        </section>
        <section id="video-player" className="md:col-span-2 md:h-[460px]">
          <VideoPlayer />
        </section>
        <section id="setup-form" className="-order-2 md:order-none">
          <WizardTabs />
        </section>
        <section id="canvas-preview" className="md:col-span-2 md:h-[460px]">
          <PreviewCard />
        </section>
        <section id="results-table" className="md:col-span-2  md:min-h-[460px]">
          <ResultsTable />
        </section>
      </div>
      <Toaster />
    </main>
  );
}

export { App };
