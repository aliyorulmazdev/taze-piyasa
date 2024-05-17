"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const ComparisonList = ({ comparisonList, removeFromComparison }) => {
  // Aynı isme sahip meyveleri gruplamak için bir fonksiyon
  const groupByMalAdi = (list) => {
    return list.reduce((groups, meyve) => {
      const key = meyve.MalAdi;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(meyve);
      return groups;
    }, {});
  };

  // Gruplanmış meyveleri al
  const groupedMeyveler = groupByMalAdi(comparisonList);

  return (
    <div className="mt-8 max-h-screen overflow-y-auto pb-20">
      <h2 className="text-xl font-bold mb-4">Karşılaştırma Listesi</h2>
      {Object.keys(groupedMeyveler).map((malAdi, index) => (
        <div key={malAdi}>
          <h3 className="text-lg font-semibold mb-2">{malAdi}</h3>
          {groupedMeyveler[malAdi].map((meyve, index) => (
            <div
              key={`${malAdi}-${index}`}
              className="bg-white dark:bg-gray-950 overflow-visible transition-all p-4 flex justify-between items-center gap-2 "
              style={{ width: "calc(100% - 2rem)", minHeight: "50px" }} // PaddingBottom eklendi
            >
              <div className="flex flex-col">
                <div className="text-gray-700 dark:text-gray-300 font-semibold">
                  {meyve.Date}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  Min: ₺{meyve.AsgariUcret} | Maks: ₺{meyve.AzamiUcret} | Ort: ₺
                  {meyve.OrtalamaUcret}
                </div>
              </div>
              <Button
                className="bg-red-500 p-3 text-white  hover:bg-red-600 transition-colors"
                onClick={() => removeFromComparison(meyve)}
              >
                Sil
              </Button>
            </div>
          ))}
          {index < Object.keys(groupedMeyveler).length - 1 && (
            <div className="border-b border-gray-300 dark:border-gray-700 mb-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComparisonList;
