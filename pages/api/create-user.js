import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  // POST isteği olup olmadığını kontrol etme
  if (req.method === 'POST') {
    // İstekten verileri alma
    const { ad_soyad, mail_adresi, urun_adi, fiyat_tipi, istenen_fiyat, send_mail } = req.body;
    const prisma = new PrismaClient();
    try {
      // Veritabanına yeni kayıt ekleme
      await prisma.priceReminder.create({
        data: {
          ad_soyad,
          mail_adresi,
          urun_adi,
          fiyat_tipi,
          istenen_fiyat,
          send_mail
        }
      });

      // Başarılı yanıt gönderme
      res.status(201).json({ message: 'Yeni kayıt oluşturuldu.' });
    } catch (error) {
      console.error('Kayıt oluşturma hatası:', error);
      // Hata durumunda yanıt gönderme
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Prisma bağlantısını serbest bırak
      await prisma.$disconnect();
    }
  } else {
    // Desteklenmeyen HTTP metodu durumunda yanıt gönderme
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
