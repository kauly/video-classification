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
import { runDetect } from "@/lib/mutations";
import { useToast } from "../ui/use-toast";

const defaultValues: InferenceFormValues = {
  confidence: 0.7,
  iou: 0.5,
};

function InferenceForm() {
  const methods = useForm({
    resolver: zodResolver(inferenceFormSchema),
    defaultValues,
  });
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["runDetect"],
    mutationFn: runDetect,
  });
  const { toast } = useToast();

  const onSubmit = methods.handleSubmit(async ({ confidence, iou }) => {
    try {
      const response = await mutateAsync({
        confidence,
        iou,
        image_path: "/app/test/bus.jpg",
      });
      toast({
        title: "Success",
        description: `${response.length} objects detected`,
      });
      console.log("🚀 ~ onSubmit ~ response:", response);
    } catch (e) {
      toast({
        description: `Error: ${e}`,
        variant: "destructive",
      });
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
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Run
            </Button>
          </CardFooter>
        </form>
      </Card>
    </FormProvider>
  );
}

export { InferenceForm };
