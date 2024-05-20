"use client";
import React from "react";
import { FaArrowUp, FaArrowDown, FaMinus, FaList } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import ZoomImage from "./ZoomImage";
import ShareSheet from "./ShareSheet";
import ProductHistory from "./ProductHistory";
import NotificationSheet from "./NotificationSheet";
import { Button } from "@/components/ui/button";

const SingleProduct = ({
  meyve,
  previousMeyve,
  date,
  handleCopyText,
  handleAddToComparison,
  comparisonList,
}) => {
  // Calculate percentage change in price
  const percentageChange = previousMeyve
    ? ((meyve.OrtalamaUcret - previousMeyve.OrtalamaUcret) /
        previousMeyve.OrtalamaUcret) *
      100
    : 0;
  // Determine the icon and label based on percentage change
  let icon = <FaMinus className="text-white dark:text-gray-400 size-6" />;
  let label = "";
  if (percentageChange > 0) {
    icon = <FaArrowUp className="text-red-500 dark:text-red-400 size-6" />;
    label = `${Math.abs(percentageChange.toFixed(2))}% Artmış`;
  } else if (percentageChange < 0) {
    icon = (
      <FaArrowDown className="text-green-500 dark:text-green-400 size-6" />
    );
    label = `${Math.abs(percentageChange.toFixed(2))}% Azalmış`;
  }

  return (
    <div
      className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl p-4 flex flex-col gap-2"
      key={meyve.MalAdi}
    >
      <div className="flex items-center justify-between">
        <div>
          {comparisonList.some(
            (item) => item.MalAdi === meyve.MalAdi && item.Date === meyve.Date
          ) ? (
            <Button className="bg-green-500 hover:bg-green-500">
              <FaList />
            </Button>
          ) : (
            <Button onClick={() => handleAddToComparison(meyve)}>
              <FaList />
            </Button>
          )}
        </div>

        <div className="flex items-center justify-end">
          <div className="flex items-center">
            {icon}
            <Label>{label}</Label>
          </div>
        </div>
      </div>
      <div>
        <ZoomImage
          alt={meyve.MalAdi}
          className="w-full aspect-square object-cover rounded-2xl"
          height={256}
          src={`/images/${meyve.MalAdi.replace(/\s+/g, "").toLowerCase()}.png`}
          width={256}
        />
      </div>
      <Label className="font-medium text-lg pt-5">{meyve.MalAdi}</Label>
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
        <div className="text-gray-700 dark:text-gray-300">
          <Label className="font-light">En Düşük: ₺{meyve.AsgariUcret}</Label>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <Label className="font-light">En Yüksek: ₺{meyve.AzamiUcret}</Label>
        </div>
      </div>
      <div className="text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700 pb-2">
        <Label className="font-medium">Ortalama Ücret: ₺
        {meyve.OrtalamaUcret}</Label> / <Label className='font-light'>{meyve.Birim}</Label>
      </div>
      <div className="flex">
        <ShareSheet meyve={meyve} date={date} handleCopyText={handleCopyText} />
        <ProductHistory meyve={meyve} date={date} />
        <NotificationSheet meyve={meyve} date={date} />
      </div>
    </div>
  );
};

export default SingleProduct;
