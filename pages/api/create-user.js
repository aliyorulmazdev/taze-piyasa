import prisma from '../../prisma/client/db.js'

export default async function handler(req, res) {
  // POST isteği olup olmadığını kontrol etme
  if (req.method === 'POST') {
    // İstekten verileri alma
    const { adSoyad, mailAdresi, urunAdi, fiyatTipi, istenenFiyat, sendMail } = req.body;
    try {
      // Veritabanına yeni kayıt ekleme
      await prisma.priceReminder.create({
        data: {
          adSoyad,
          mailAdresi,
          urunAdi,
          fiyatTipi,
          istenenFiyat,
          sendMail
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
