import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { useAppActions, useVideoInstance } from "@/lib/state";
import { useToast } from "../ui/use-toast";
import html2canvas from "html2canvas";
import { Label } from "../ui/label";
import { ChangeEvent } from "react";

function VideoForm() {
  const { toast } = useToast();
  const { setVideoUrl, setCapturedImage } = useAppActions();
  const videoInstance = useVideoInstance();

  const handleLoad = (ev: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!ev.target.files || !ev.target.files?.length) {
        throw Error("Empty file");
      }
      const target = ev.target.files[0];
      const url = URL.createObjectURL(target);
      setVideoUrl(url);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `${err}`,
      });
    }
  };

  const handleCapture = async () => {
    try {
      if (!videoInstance) {
        throw Error("The video instance is empty");
      }

      const videoEl = videoInstance.getInternalPlayer() as HTMLVideoElement;

      if (!videoEl.src) {
        throw Error("You need to load a video first");
      }

      const canvas = await html2canvas(videoEl);
      const img = canvas.toDataURL("image/jpeg");
      setCapturedImage(img);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${err}`,
      });
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Video and Capture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label id="video" />
          <Input
            id="video"
            type="file"
            accept="video/*"
            onChange={handleLoad}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCapture}>Capture a frame</Button>
      </CardFooter>
    </Card>
  );
}

export { VideoForm };
