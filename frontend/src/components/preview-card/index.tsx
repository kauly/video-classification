import { StaticCanvas } from "fabric";
import { useCallback } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppActions } from "@/lib/state";
import { Label } from "../ui/label";

function PreviewCard() {
  const { setCanvasInstance } = useAppActions();
  const getInstance = useCallback(
    (node: HTMLCanvasElement) => {
      if (node) {
        const fabricCanvas = new StaticCanvas(node, {
          renderOnAddRemove: false,
        });
        setCanvasInstance(fabricCanvas);
      }
    },
    [setCanvasInstance]
  );

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Video Preview</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full">
        <Label>Testando</Label>
        <canvas id="previewCanvas" ref={getInstance} />
      </CardContent>
    </Card>
  );
}

export { PreviewCard };
