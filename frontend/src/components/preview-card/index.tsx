import { StaticCanvas } from "fabric";
import { useCallback } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppActions, useIsVideoPlaying } from "@/lib/state";

function PreviewCard() {
  const isVideoReady = useIsVideoPlaying();
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
        {isVideoReady ? undefined : (
          <Label>Hit the play button to start the capture</Label>
        )}
        <canvas id="previewCanvas" ref={getInstance} />
      </CardContent>
    </Card>
  );
}

export { PreviewCard };
