"use client"
import React from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import ZoomImage from "./ZoomImage";
import ShareSheet from "./ShareSheet";
import ProductHistory from "./ProductHistory";
import NotificationSheet from "./NotificationSheet";

const SingleProduct = ({ meyve, previousMeyve, date, handleCopyText }) => {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl p-4 flex flex-col gap-2" key={meyve.MalAdi}>

      <div className="flex items-center justify-end gap-1">
        {previousMeyve ? (
          <>
            {meyve.OrtalamaUcret > previousMeyve.OrtalamaUcret ? (
              <>
                <Label>Fiyatı Artmış</Label>
                <FaArrowUp className="text-red-500 dark:text-red-400 size-6" />
              </>
            ) : meyve.OrtalamaUcret < previousMeyve.OrtalamaUcret ? (
              <>
                <FaArrowDown className="text-green-500 dark:text-green-400 size-6" />
                <Label>Fiyatı Düşmüş</Label>
              </>
            ) : (
              <FaMinus className="text-white dark:text-gray-400 size-6" />
            )}
          </>
        ) : null}
      </div>
      <div>
        <ZoomImage
          alt={meyve.MalAdi}
          className="w-full aspect-square object-cover rounded-lg"
          height={256}
          src={`/images/${meyve.MalAdi.replace(/\s+/g, "").toLowerCase()}.png`}
          width={256}
        />
      </div>
      <h3 className="text-lg font-semibold pt-3">{meyve.MalAdi}</h3>
      <div className="flex items-center justify-between">
        <div className="text-gray-500 dark:text-gray-400">
          <Label className="font-medium">Ürün Tipi: </Label>
          {meyve.MalTipAdi}
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          <Label className="font-medium">Birimi: </Label>
          {meyve.Birim}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-gray-500 dark:text-gray-400">
          <Label className="font-medium">En Düşük: </Label>₺{meyve.AsgariUcret}
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          <Label className="font-medium">En Yüksek: </Label>₺{meyve.AzamiUcret}
        </div>
      </div>
      <div className="text-gray-500 dark:text-gray-400">
        <Label className="font-medium">Ortalama Ücret: </Label>₺{meyve.OrtalamaUcret}
      </div>
      {/* Share Sheet */}
      <ShareSheet meyve={meyve} date={date} handleCopyText={handleCopyText} />
      <ProductHistory meyve={meyve} date={date} />
      <NotificationSheet meyve={meyve} date={date} />
    </div>
  );
};

export default SingleProduct;
