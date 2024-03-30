import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon, CheckIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
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
import { modelFormSchema } from "./schema";
import { HookedSelect, SelectOption } from "../ui/hooked-select";
import { MODELS } from "@/lib/app.types";
import { setModel } from "@/lib/mutations";
import { useToast } from "../ui/use-toast";
import { Label } from "@radix-ui/react-label";

const MODEL_OPTIONS: SelectOption[] = [
  { label: "YOLOv8n", value: MODELS.YOLOv8n },
  { label: "YOLOv8s", value: MODELS.YOLOv8s },
];

function ModelForm() {
  const methods = useForm({
    resolver: zodResolver(modelFormSchema),
  });
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["setModel"],
    mutationFn: setModel,
  });
  const { toast } = useToast();

  const onSubmit = methods.handleSubmit(async ({ model_name }) => {
    try {
      const response = await mutateAsync({
        model_name,
      });
      toast({
        title: "Success",
        description: `${response}`,
      });
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
          <CardTitle>Select a Model</CardTitle>
          <CardDescription>
            First is necessary to select a model.
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <HookedSelect
                name="model_name"
                label="Model"
                placeholder="Choose a model..."
                options={MODEL_OPTIONS}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
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

export { ModelForm };
