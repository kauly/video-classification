import clsx from "clsx";
import { Circle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useSocketStatus } from "@/lib/state";

function SocketStatus() {
  const isSocketReady = useSocketStatus();

  return (
    <Card className="p-4 inline-flex">
      <div className="flex items-center space-x-2">
        <Circle
          className={clsx(isSocketReady ? "text-green-400" : "text-red-400")}
        />
        <Label>{isSocketReady ? "Connected" : "Offline"}</Label>
      </div>
    </Card>
  );
}

export { SocketStatus };
