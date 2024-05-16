import axios from "axios";
import { Resend } from "resend";
import prisma from "../../prisma/client/db.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const formattedDate = new Date().toISOString().split("T")[0];
      const response = await axios.get(
        `https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/${formattedDate}`
      );
      const data = response.data;

      const reminders = await prisma.priceReminder.findMany();

      for (const row of reminders) {
        for (const item of data.HalFiyatListesi) {
            if (item.MalAdi.toLowerCase() === row.urunAdi.toLowerCase()) {
            let price;
            if (row.fiyatTipi === "Average") {
              price = item.OrtalamaUcret;
            } else if (row.fiyatTipi === "Maximum") {
              price = item.AzamiUcret;
            } else if (row.fiyatTipi === "Minimum") {
              price = item.AsgariUcret;
            }
            console.log(
              `${row.adSoyad} - Ürün - ${row.urunAdi} - İstenen Fiyat - ${row.istenenFiyat} - ${row.fiyatTipi} - CurrentPrice: ${price}`
            );
            if (price <= row.istenenFiyat) {
              // E-posta gönderimi
              await sendEmail(
                row.mailAdresi,
                row.adSoyad,
                row.urunAdi,
                row.fiyatTipi,
                row.istenenFiyat,
                price
              );
              // İlgili veritabanı satırını silme işlemi
              await prisma.priceReminder.delete({ where: { id: row.id } });
              // .600 bekleme
              await delay(600);
            }
          }
        }
      }

      await prisma.$disconnect();

      res.status(200).json({ message: "İşlem tamamlandı." });
    } catch (error) {
      console.error("İstek hatası:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

async function sendEmail(
  mail,
  adSoyad,
  urunAdi,
  fiyatTipi,
  istenenFiyat,
  currentPrice
) {
  const today = new Date().toISOString().split("T")[0];

  const emailHtml = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 80%;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding: 20px 0;
                    }

                    .content {
                        text-align: center;
                    }
                    .content h1 {
                        color: #333;
                    }
                    .content p {
                        color: #666;
                        line-height: 1.6;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px 0;
                        color: #999;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Taze Piyasa | Fiyat Bildirimi</h1>
                    </div>
                    <div class="content">
                        <h1>Merhaba ${adSoyad},</h1>
                        <p>Bugünün tarihi: ${today}</p>
                        <p>İstediğiniz ürünün fiyatı istenilen seviyede.</p>
                        <p><strong>Ürün Adı:</strong> ${urunAdi}</p>
                        <p><strong>Fiyat Tipi:</strong> ${fiyatTipi}</p>
                        <p><strong>İstenen Fiyat:</strong> ${istenenFiyat}</p>
                        <p><strong>Şuanki Fiyat:</strong> ${currentPrice}</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 Taze Piyasa. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </body>
        </html>
    `;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: mail,
    subject: "Taze Piyasa | Fiyat Bildirimi",
    html: emailHtml,
  });

  if (error) {
    throw new Error(`E-posta gönderim hatası: ${error.message}`);
  }

  console.log("E-posta gönderildi:", data);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
