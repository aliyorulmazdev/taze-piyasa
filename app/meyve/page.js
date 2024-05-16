"use client";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { format, startOfDay } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "../_components/Sidebar";
import SortDropdown from "../_components/SortDropdown";
import SingleProduct from "../_components/SingleProduct.js";
import PopoverButton from "../_components/PopoverButton";

export default function Meyve() {
  const [meyveData, setMeyveData] = useState([]);
  const [date, setDate] = React.useState(startOfDay(new Date()));
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeyveData, setFilteredMeyveData] = useState([]);
  const [sortOption, setSortOption] = useState("name-asc");
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [filteredPreviousMeyveData, setFilteredPreviousMeyveData] = useState(
    []
  );
  const { toast } = useToast();
  // İlk useEffect içerisine
  useEffect(() => {
    const fetchData = async () => {
      // Önceki günün tarihini al
      const previousDate = new Date(date);
      previousDate.setDate(previousDate.getDate() - 1);
      const formattedPreviousDate = format(previousDate, "yyyy-MM-dd");

      // Şu anki tarih için veri isteği yap
      setLoading(true);
      setNoData(false);
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const response = await axios.get(
          `https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/${formattedDate}`
        );

        if (response.status === 204) {
          setNoData(true);
        } else {
          const meyveListesi = response.data.HalFiyatListesi.filter(
            (item) => item.MalTipAdi === "MEYVE"
          );
          setMeyveData(meyveListesi);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }

      // Önceki gün için veri isteği yap
      try {
        const response = await axios.get(
          `https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/${formattedPreviousDate}`
        );

        if (response.status === 204) {
          // İlgili gün için veri yoksa boş liste oluştur
          setFilteredPreviousMeyveData([]);
        } else {
          const meyveListesi = response.data.HalFiyatListesi.filter(
            (item) => item.MalTipAdi === "MEYVE"
          );
          setFilteredPreviousMeyveData(meyveListesi);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date]);

  useEffect(() => {
    const filtered = meyveData.filter((item) =>
      item.MalAdi.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.MalAdi.localeCompare(b.MalAdi);
        case "name-desc":
          return b.MalAdi.localeCompare(a.MalAdi);
        case "price-asc":
          return a.OrtalamaUcret - b.OrtalamaUcret;
        case "price-desc":
          return b.OrtalamaUcret - a.OrtalamaUcret;
        default:
          return 0;
      }
    });

    setFilteredMeyveData(sorted);
  }, [searchQuery, meyveData, sortOption]);

  useEffect(() => {
    const filtered = meyveData.filter((item) =>
      item.MalAdi.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMeyveData(filtered);
  }, [searchQuery, meyveData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setDate(startOfDay(new Date()));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Tebrikler!",
        description: "Başarıyla kopyalandı.",
      });
    });
  };

  return (
    <>
      <main className="flex flex-col md:flex-row w-full min-h-[100dvh]">
        {/* Sidebar */}
        <Sidebar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleResetFilters={handleResetFilters}
        />
        {/* Main content */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 ">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6 p-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl hidden md:block">
                Meyve
              </h1>
              {/* Popover - DateSelection */}
              <PopoverButton date={date} onSelect={setDate} />
              {/* SortDropDown */}
              <SortDropdown handleSortChange={handleSortChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden transition-all p-4 flex flex-col gap-2"
                    key={index}
                  >
                    <Skeleton className="w-full h-64 aspect-square object-cover rounded-lg" />
                    <Skeleton className="w-1/2 h-8 mt-3" />
                    <Skeleton className="w-3/4 h-6 mt-2" />
                    <Skeleton className="w-1/2 h-6 mt-2" />
                    <Skeleton className="w-full h-10 mt-2" />
                    <Skeleton className="w-full h-10 mt-2" />
                  </div>
                ))
              ) : noData ? (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
                  <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                    Üzgünüz, bugün için ürün fiyatları henüz gelmedi.
                  </h2>
                </div>
              ) : (
                filteredMeyveData.map((meyve) => (
                  <SingleProduct
                    key={meyve.MalAdi}
                    meyve={meyve}
                    previousMeyve={filteredPreviousMeyveData.find(
                      (item) => item.MalAdi === meyve.MalAdi
                    )}
                    date={date}
                    handleCopyText={handleCopyText}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
