"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { FaList } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ComparisonList from "./ComparisionList";

const ComparisionSheet = ({ comparisonList, removeFromComparison }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={`flex items-center w-full ${comparisonList.length ? 'bg-green-500 hover:bg-green-600' : ''}`} variant="default">
            <FaList className="mr-2" /> Karşılaştırma Listesi
          </Button>
        </SheetTrigger>
        <SheetContent>
          <ComparisonList comparisonList={comparisonList} removeFromComparison={removeFromComparison} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ComparisionSheet;
