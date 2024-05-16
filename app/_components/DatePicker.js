"use client"
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { startOfDay } from "date-fns";

const DatePicker = ({ date, onSelect }) => {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={onSelect}
      initialFocus
    />
  );
};

export default DatePicker;
