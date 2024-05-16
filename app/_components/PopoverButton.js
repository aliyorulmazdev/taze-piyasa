"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DatePicker from "./DatePicker";

const PopoverButton = ({ date, onSelect }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Tarih Seçin"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker date={date} onSelect={onSelect} />
      </PopoverContent>
    </Popover>
  );
};

export default PopoverButton;
