"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaShare } from "react-icons/fa";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const formSchema = z.object({
  adSoyad: z.string().min(2, {
    message: "Ad Soyad en az 2 karakter olmalıdır.",
  }),
  mailAdresi: z.string().email("Geçerli bir e-posta adresi giriniz."),
  fiyatTipi: z.enum(["Average", "Maximum", "Minimum"]),
  istenenFiyat: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Fiyat Yazmalısınız."
  })
});

const NotificationSheet = ({ meyve, date, handleCopyText }) => {
  const [formData, setFormData] = useState({
    adSoyad: "",
    mailAdresi: "",
    fiyatTipi: "Average",
    istenenFiyat: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors = validation.error.flatten().fieldErrors;
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { ...formData, urunAdi: meyve.MalAdi, sendMail: true };

    try {
      const response = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Subscription successful:", result);
      alert("Subscription successful");
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Subscription failed");
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex items-center w-full" variant="outline">
            <FaShare className="mr-2" /> Fiyat Takibi
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>İletişim Bilgileri</SheetTitle>
            <Label>Seçilen Ürün: {meyve.MalAdi}</Label>
          </SheetHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>Ad Soyad</Label>
              <Input
                type="text"
                name="adSoyad"
                value={formData.adSoyad}
                onChange={handleChange}
              />
              {errors.adSoyad && <p className="text-red-600">{errors.adSoyad}</p>}
            </div>
            <div className="mb-4">
              <Label>E-posta Adresi</Label>
              <Input
                type="email"
                name="mailAdresi"
                value={formData.mailAdresi}
                onChange={handleChange}
              />
              {errors.mailAdresi && <p className="text-red-600">{errors.mailAdresi}</p>}
            </div>
            <div className="mb-4">
              <Label>Fiyat Tipi</Label>
              <select
                name="fiyatTipi"
                value={formData.fiyatTipi}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Average">Ortalama Fiyat</option>
                <option value="Maximum">En Yüksek Fiyat</option>
                <option value="Minimum">En Düşük Fiyat</option>
              </select>
              {errors.fiyatTipi && <p className="text-red-600">{errors.fiyatTipi}</p>}
            </div>
            <div className="mb-4">
              <Label>İstenen Fiyat</Label>
              <Input
                type="number"
                name="istenenFiyat"
                value={formData.istenenFiyat}
                onChange={handleChange}
              />
              {errors.istenenFiyat && <p className="text-red-600">{errors.istenenFiyat}</p>}
            </div>
            <Button className="w-full mt-4" type="submit">
              Bana Haber Ver
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NotificationSheet;
