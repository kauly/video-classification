import { ImageCard } from "@/components/image-card";
import { ResultsTable } from "@/components/results-table";
import { useLabeledImage } from "@/lib/state";

function ResultContent() {
  const labeledImage = useLabeledImage();
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <ImageCard
          title="Labeled Image"
          description="It's necessary to run inference to see the labeled image here"
          imgSrc={labeledImage}
        />
      </div>
      <div className="flex-1">
        <ResultsTable />
      </div>
    </div>
  );
}

export { ResultContent };
