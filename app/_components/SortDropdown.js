"use client"
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SortDropdown({ handleSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          <Label className="text-base">Sırala</Label>
        </div>
        <Select defaultValue="name-asc" id="sort" onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Name (A-Z)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Ad (A-Z)</SelectItem>
            <SelectItem value="name-desc">Ad (Z-A)</SelectItem>
            <SelectItem value="price-asc">Fiyat (Düşükten Yükseğe)</SelectItem>
            <SelectItem value="price-desc">Fiyat (Yüksekten Düşüğe)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
