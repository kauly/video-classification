import { useController } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "./label";

export type SelectOption = {
  value: string;
  label: string;
};

type HookedSelectProps = {
  label: string;
  name: string;
  placeholder: string;
  hint?: string;
  options: SelectOption[];
};

function HookedSelect({
  label,
  name = "",
  options = [],
  placeholder,
  hint,
}: HookedSelectProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });
  return (
    <div className="flex flex-col space-y-2">
      <Label className={error ? "text-red-400" : ""}>{label}</Label>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hint ? (
        <Label className="text-muted-foreground">{hint}</Label>
      ) : undefined}
      <Label className="text-red-400">{error ? error.message : <br />}</Label>
    </div>
  );
}

export { HookedSelect };
