"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FeatureCard from "./FeatureCard";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Sidebar({
  searchQuery,
  handleSearchChange,
  handleResetFilters,
}) {
  return (
    <div className="bg-white dark:bg-gray-950 w-full md:w-1/3 lg:w-1/4 p-6 border-r border-gray-200 dark:border-gray-800 md:block md:sticky top-0">
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button size="sm" variant="default">
              <FaArrowLeft className="mr-3" />Anasayfa
            </Button>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Taze Lezzet
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
          <div className="hidden md:flex justify-center pt-10">
            <div className="inline-block">
              <FeatureCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
