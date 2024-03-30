import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDimensions } from "@/lib/state";

type ImageCardProps = {
  title: string;
  description: string;
  imgSrc?: string;
};

function ImageCard({ description, title, imgSrc }: ImageCardProps) {
  const dimensions = useDimensions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={`w-full h-full md:w-[${dimensions.width}px] md:h-[${dimensions.height}px]`}
      >
        {imgSrc ? (
          <img src={imgSrc} alt={title} />
        ) : (
          <Label>{description}</Label>
        )}
      </CardContent>
    </Card>
  );
}

export { ImageCard };
