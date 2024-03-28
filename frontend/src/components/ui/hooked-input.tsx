import { Label } from "@radix-ui/react-label";
import { useController } from "react-hook-form";

import { Input } from "./input";

type HookedInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  hint?: string;
};

function HookedInput({ label, name, placeholder, hint }: HookedInputProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name });

  return (
    <div className="flex flex-col space-y-2">
      <Label className={error ? "text-red-400" : ""}>{label}</Label>
      <Input
        id={name}
        placeholder={label}
        value={value}
        aria-placeholder={placeholder}
        onChange={onChange}
      />
      {hint ? (
        <Label className="text-muted-foreground">{hint}</Label>
      ) : undefined}
      <Label className="text-red-400">{error ? error.message : <br />}</Label>
    </div>
  );
}

export { HookedInput };
