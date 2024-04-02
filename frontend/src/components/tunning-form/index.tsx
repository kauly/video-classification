import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HookedInput } from "@/components/ui/hooked-input";
import { useToast } from "@/components/ui/use-toast";
import { useAppActions, useSocketStatus, useVideoInstance } from "@/lib/state";
import { tunningFormSchema, type TunningFormValues } from "./schema";

const defaultValues: TunningFormValues = {
  confidence: 0.7,
  iou: 0.5,
};

function TunningForm() {
  const { toast } = useToast();
  const { setTunning } = useAppActions();
  const videoInstance = useVideoInstance();
  const isSocketReady = useSocketStatus();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(tunningFormSchema),
    defaultValues,
  });

  const onSubmit = methods.handleSubmit((data) => {
    setLoading(true);
    try {
      if (!videoInstance) {
        throw Error("The video instance is empty");
      }
      if (!isSocketReady) {
        throw Error("The socket is offline");
      }

      setTunning(data);
      videoInstance.play();
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
      <Card className="w-full md:w-[350px]">
        <CardHeader>
          <CardTitle>Model Tunning</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-1">
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

export { TunningForm };
