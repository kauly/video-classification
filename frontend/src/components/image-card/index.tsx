import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type ImageCardProps = {
  title: string;
  description: string;
  imgSrc?: string;
};

function ImageCard({ description, title, imgSrc }: ImageCardProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
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
