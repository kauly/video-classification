import { ChangeEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HookedSelect, SelectOption } from "@/components/ui/hooked-select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MODELS, WIZARD_TABS } from "@/lib/app.types";
import { setModel } from "@/lib/mutations";
import { useAppActions } from "@/lib/state";
import { SetupFormValues, setupFormSchema } from "./schema";

const MODEL_OPTIONS: SelectOption[] = [
  { label: "YOLOv8n", value: MODELS.YOLOv8n },
  { label: "YOLOv8s", value: MODELS.YOLOv8s },
];

const initialForm: SetupFormValues = {
  model_name: MODELS.YOLOv8s,
};

function SetupForm() {
  const { setVideoUrl, setSelectedTab } = useAppActions();
  const methods = useForm({
    resolver: zodResolver(setupFormSchema),
    values: initialForm,
  });
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["setModel"],
    mutationFn: setModel,
  });
  const { toast } = useToast();

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

  const onSubmit = methods.handleSubmit(async ({ model_name }) => {
    try {
      const response = await mutateAsync({
        model_name,
      });
      toast({
        title: "Success",
        description: `${response}`,
      });
      setSelectedTab(WIZARD_TABS.tunning);
    } catch (e) {
      toast({
        description: `Error: ${e}`,
        variant: "destructive",
      });
    }
  });

  return (
    <FormProvider {...methods}>
      <Card className="w-full md:w-[350px]">
        <CardHeader>
          <CardTitle>Setup</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div>
                <Label htmlFor="video">Video File</Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleLoad}
                />
                <div className="pl-1 text-sm text-slate-500">
                  Optionally load your own video.
                </div>
              </div>

              <HookedSelect
                name="model_name"
                label="Model"
                placeholder="Choose a model..."
                options={MODEL_OPTIONS}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Next
            </Button>
            {isSuccess ? (
              <div className="flex items-center space-x-2 ">
                <Label>Ok</Label>
                <CheckIcon className="text-green-400" />
              </div>
            ) : undefined}
          </CardFooter>
        </form>
      </Card>
    </FormProvider>
  );
}

export { SetupForm };
