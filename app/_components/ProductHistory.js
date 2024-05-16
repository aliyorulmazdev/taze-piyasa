import React, { useState } from "react";
import axios from "axios";
import { FaHistory } from "react-icons/fa";
import { format, addDays, eachDayOfInterval } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Chart } from "react-google-charts";
import { Label } from "@/components/ui/label";

const ProductHistory = ({ meyve, date }) => {
  const [geçmişVeri, setGeçmişVeri] = useState([]);
  const [loading, setLoading] = useState(false);

  const findSameMeyveData = (data, productName) => {
    return data.filter((item) => item.MalAdi === productName);
  };

  const fetchGeçmişVeri = async () => {
    setLoading(true);
    const formattedDate = format(date, "yyyy-MM-dd");
    const previousDate = format(addDays(date, -7), "yyyy-MM-dd");
    const dates = eachDayOfInterval({
      start: new Date(previousDate),
      end: new Date(formattedDate),
    });

    const dataPromises = dates.map(async (date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      try {
        const response = await axios.get(
          `https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/${formattedDate}`
        );
        if (response.status === 204) {
          // 204 No Content response, return an empty array
          return [];
        } else {
          // Map over HalFiyatListesi array and assign BultenTarihi to DATE for each item
          return response.data.HalFiyatListesi.map((item) => ({
            ...item,
            DATE: response.data.BultenTarihi,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    });

    Promise.all(dataPromises)
      .then((results) => {
        const allData = results.flat();
        const filteredData = findSameMeyveData(allData, meyve.MalAdi);
        setGeçmişVeri(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const prepareChartData = () => {
    const chartData = [["Date", "Ortalama Fiyat"]];

    // Assuming geçmişVeri array contains data for the last 7 days
    geçmişVeri.forEach((veri) => {
      const date = new Date(veri.DATE);
      const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
        "0" + date.getDate()
      ).slice(-2)}`;
      chartData.push([formattedDate, parseFloat(veri.OrtalamaUcret)]);
    });
    return chartData;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex items-center w-full"
          variant="outline"
          onClick={fetchGeçmişVeri}
        >
          <FaHistory className="mr-2" />
          Geçmişi Göster
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{meyve.MalAdi} - Geçmiş Veri</SheetTitle>
        </SheetHeader>
        {loading ? (
              <Label>Veriler yükleniyor...</Label>
            ) : (
              <Chart
                width={"100%"}
                height={"400px"}
                chartType="LineChart"
                loader={<Label>Veriler yükleniyor...</Label>}
                data={prepareChartData()}
                options={{
                  hAxis: {
                    title: "Tarih(Ay-Gün)",
                  },
                  vAxis: {
                    title: "Fiyat",
                  },
                  legend: "none",
                }}
              />
            )}
      </SheetContent>
    </Sheet>
  );
};

export default ProductHistory;
