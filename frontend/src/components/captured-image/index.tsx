import { useCapturedImage } from "@/lib/state";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

function CapturedImage() {
  const capturedImage = useCapturedImage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Captured Frame</CardTitle>
      </CardHeader>
      <CardContent>
        {capturedImage ? (
          <img src={capturedImage.src} alt="Captured Image" />
        ) : (
          <Label>
            Click on the "Capture a frame" button to display an image here
          </Label>
        )}
      </CardContent>
    </Card>
  );
}

export { CapturedImage };
