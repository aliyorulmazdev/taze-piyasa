"use client";
import axios from "axios";
import * as React from "react";
import { Label } from "@/components/ui/label";
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

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GrayscaleImage from "../_components/GrayscaleImage";

export default function Meyve() {
  const [meyveData, setMeyveData] = useState([]);
  const [date, setDate] = React.useState(startOfDay(new Date()));
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeyveData, setFilteredMeyveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const response = await axios.get(
          `https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/${formattedDate}`
        );
        // Sadece MEYVE'leri filtrele
        const meyveListesi = response.data.HalFiyatListesi.filter(
          (item) => item.MalTipAdi === "MEYVE"
        );
        setMeyveData(meyveListesi);
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
    setFilteredMeyveData(filtered);
  }, [searchQuery, meyveData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
              <Button size="sm" variant="outline">
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
                  placeholder="Search by name"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button className="w-full" variant="default">
                Filtrele
              </Button>
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
                  <Select defaultValue="name-asc" id="sort">
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
              {filteredMeyveData.map((meyve) => (
                <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl p-4 flex flex-col gap-2" key={meyve.MalAdi}>
                  <div>
                    <GrayscaleImage
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
                  <h3 className="text-lg font-semibold pt-3">{meyve.MalAdi}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 dark:text-gray-400">
                      <Label className="font-medium">Ürün Tipi:</Label>
                      {meyve.MalTipAdi}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <Label className="font-medium">Birimi:</Label>
                      {meyve.Birim}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 dark:text-gray-400">
                      <Label className="font-medium">En Düşük:</Label>₺
                      {meyve.AsgariUcret}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <Label className="font-medium">En Yüksek:</Label>₺
                      {meyve.AzamiUcret}
                    </div>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    <Label className="font-medium">Ortalama Ücret:</Label>₺
                    {meyve.OrtalamaUcret}
                  </div>
                  <Button className="w-full" variant='default'>
                    Vikipedi'le
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-500" variant='default'>
                    Paylaş
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
