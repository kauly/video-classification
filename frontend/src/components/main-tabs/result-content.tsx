import { ImageCard } from "@/components/image-card";
import { useLabeledImage } from "@/lib/state";

function ResultContent() {
  const labeledImage = useLabeledImage();
  return (
    <div>
      <ImageCard
        title="Labeled Image"
        description="It's necessary to run inference to see the labeled image here"
        imgSrc={labeledImage}
      />
    </div>
  );
}

export { ResultContent };
