"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaShare } from "react-icons/fa";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ShareSheet = ({ meyve, date, handleCopyText }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="flex-1 rounded-none border-r border-gray-200 dark:border-gray-800 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
          >
            <FaShare className="mr-2" /> Paylaş
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Paylaşım Bilgileri</SheetTitle>
            <SheetDescription>
              <textarea
                className="w-full h-32 border p-2"
                defaultValue={`Hey, ${format(date, "dd.MM.yyyy")} günü için ${
                  meyve.MalAdi
                } ürününün ${meyve.Birim} biriminde ortalama fiyatı ₺${
                  meyve.OrtalamaUcret
                }. En az ₺${meyve.AsgariUcret} ücretinden, en fazla ise ₺${
                  meyve.AzamiUcret
                } ücretinden satış görüyor.`}
              />
            </SheetDescription>
          </SheetHeader>
          <Button
            className="w-full mt-4"
            onClick={() =>
              handleCopyText(
                `Hey, ${format(date, "dd.MM.yyyy")} günü için Armut(${
                  meyve.MalAdi
                }) ürününün ${meyve.Birim} i başına ortalama fiyatı ${
                  meyve.OrtalamaUcret
                }. En az ${meyve.AsgariUcret} ücretinden, en fazla ise ${
                  meyve.AzamiUcret
                } ücretinden satış görüyor.`
              )
            }
          >
            Yazıyı Kopyala
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShareSheet;
