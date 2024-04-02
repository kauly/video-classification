import { StaticCanvas } from "fabric";
import { useCallback } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useAppActions } from "@/lib/state";

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
    <Card className="w-full h-full pt-4">
      <CardContent className="w-full h-full">
        <canvas id="previewCanvas" ref={getInstance} />
      </CardContent>
    </Card>
  );
}

export { PreviewCard };
