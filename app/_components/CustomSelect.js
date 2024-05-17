import React from 'react';
import { useController } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CustomSelect = ({ name, control, defaultValue, options }) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger className="w-full mt-4 border p-2">
        <SelectValue placeholder="Fiyat Tipi" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
