import { Circle } from "lucide-react";
import { Card } from "../ui/card";
import { useSocketStatus } from "@/lib/state";
import clsx from "clsx";
import { Label } from "../ui/label";

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
