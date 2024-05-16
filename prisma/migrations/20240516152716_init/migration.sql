-- CreateTable
CREATE TABLE "PriceReminder" (
    "id" SERIAL NOT NULL,
    "ad_soyad" TEXT NOT NULL,
    "mail_adresi" TEXT NOT NULL,
    "urun_adi" TEXT NOT NULL,
    "fiyat_tipi" TEXT NOT NULL,
    "istenen_fiyat" DOUBLE PRECISION NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_check_date" TIMESTAMP(3),
    "send_mail" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PriceReminder_pkey" PRIMARY KEY ("id")
);
