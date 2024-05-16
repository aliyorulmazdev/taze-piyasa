"use client";
import axios from "axios";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { FaShare, FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import FeatureCard from "../_components/ProfileCard";
import ZoomImage from "../_components/ZoomImage";
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
        <div className="bg-white dark:bg-gray-950 w-full md:w-1/3 lg:w-1/4 p-6 border-r border-gray-200 dark:border-gray-800 md:block md:sticky top-0">
          <div className="space-y-6 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Filtrele
              </h2>
              <Button size="sm" variant="outline" onClick={handleResetFilters}>
                Temizle
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <Label className="text-base" htmlFor="name">
                  Adı
                </Label>
                <Input
                  id="name"
                  placeholder="Buraya yazın."
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button className="w-full" variant="default">
                Filtrele
              </Button>
              <div class="hidden md:flex justify-center pt-10">
                <div class="inline-block">
                  <FeatureCard />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 ">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6 p-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl hidden md:block">
                Meyve
              </h1>
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
                    {date ? format(date, "PPP") : <Label>Tarih Seçin</Label>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="hidden md:block">
                    <Label className="text-base">Sırala</Label>
                  </div>
                  <Select
                    defaultValue="name-asc"
                    id="sort"
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Name (A-Z)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Ad (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Ad (Z-A)</SelectItem>
                      <SelectItem value="price-asc">
                        Fiyat (Düşükten Yükseğe)
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Fiyat (Yüksekten Düşüğe)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                  <div
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl p-4 flex flex-col gap-2"
                    key={meyve.MalAdi}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {filteredPreviousMeyveData.length > 0 ? (
                        <>
                          {meyve.OrtalamaUcret >
                          filteredPreviousMeyveData.find(
                            (item) => item.MalAdi === meyve.MalAdi
                          ).OrtalamaUcret ? (
                            <>
                              <Label>Fiyatı Artmış</Label>
                              <FaArrowUp className="text-red-500 dark:text-red-400 size-6" />
                            </>
                          ) : meyve.OrtalamaUcret <
                            filteredPreviousMeyveData.find(
                              (item) => item.MalAdi === meyve.MalAdi
                            ).OrtalamaUcret ? (
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
                    <div className="">
                      <ZoomImage
                        alt={meyve.MalAdi}
                        className="w-full aspect-square object-cover rounded-lg"
                        height={256}
                        src={`/images/${meyve.MalAdi.replace(
                          /\s+/g,
                          ""
                        ).toLowerCase()}.png`}
                        width={256}
                      />
                    </div>
                    <h3 className="text-lg font-semibold pt-3">
                      {meyve.MalAdi}
                    </h3>
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
                        <Label className="font-medium">En Düşük: </Label>₺
                        {meyve.AsgariUcret}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        <Label className="font-medium">En Yüksek: </Label>₺
                        {meyve.AzamiUcret}
                      </div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <Label className="font-medium">Ortalama Ücret: </Label>₺
                      {meyve.OrtalamaUcret}
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          className="flex items-center w-full"
                          variant="outline"
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
                              defaultValue={`Hey, ${format(
                                date,
                                "dd.MM.yyyy"
                              )} günü için ${meyve.MalAdi} ürününün ${
                                meyve.Birim
                              } biriminde ortalama fiyatı ₺${
                                meyve.OrtalamaUcret
                              }. En az ₺${
                                meyve.AsgariUcret
                              } ücretinden, en fazla ise ₺${
                                meyve.AzamiUcret
                              } ücretinden satış görüyor.`}
                            />
                          </SheetDescription>
                        </SheetHeader>
                        <Button
                          className="w-full mt-4"
                          onClick={() =>
                            handleCopyText(
                              `Hey, ${format(
                                date,
                                "dd.MM.yyyy"
                              )} günü için Armut(${meyve.MalAdi}) ürününün ${
                                meyve.Birim
                              } i başına ortalama fiyatı ${
                                meyve.OrtalamaUcret
                              }. En az ${
                                meyve.AsgariUcret
                              } ücretinden, en fazla ise ${
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
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
