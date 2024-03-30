import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { inferenceFormSchema, type InferenceFormValues } from "./schema";
import { HookedInput } from "../ui/hooked-input";
import { runDetect, uploadImage } from "@/lib/mutations";
import { useToast } from "../ui/use-toast";
import { useCapturedImage } from "@/lib/state";
import { createCanvasWithImageAndBoxes } from "@/lib/utils";
import { useState } from "react";

const defaultValues: InferenceFormValues = {
  confidence: 0.7,
  iou: 0.5,
};

function InferenceForm() {
  const capturedImage = useCapturedImage();
  const { toast } = useToast();
  const methods = useForm({
    resolver: zodResolver(inferenceFormSchema),
    defaultValues,
  });
  const { mutateAsync: runDetectAsync } = useMutation({
    mutationKey: ["runDetect"],
    mutationFn: runDetect,
  });
  const { mutateAsync: uploadImageAsync } = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: uploadImage,
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = methods.handleSubmit(async ({ confidence, iou }) => {
    setLoading(true);
    try {
      if (!capturedImage) {
        throw Error("You need to capture an image first");
      }
      // pass the objectURL to blob
      const blob = await fetch(capturedImage.src).then((r) => r.blob());
      // create a file
      const file = new File([blob], "capture.jpeg", { type: "image/jpeg" });
      // create a form
      const form = new FormData();
      form.append("file", file);
      const filePath = await uploadImageAsync(form);
      const response = await runDetectAsync({
        confidence,
        iou,
        image_path: filePath,
      });
      await createCanvasWithImageAndBoxes(capturedImage, response);
      toast({
        title: "Success",
        description: `${response.length} objects detected`,
      });
    } catch (e) {
      toast({
        description: `Error: ${e}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Model Parameters</CardTitle>
          <CardDescription>Model tunning options.</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <HookedInput name="confidence" label="Confidence" />
              <HookedInput name="iou" label="IOU" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={loading}>
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Run
            </Button>
          </CardFooter>
        </form>
      </Card>
    </FormProvider>
  );
}

export { InferenceForm };
