import db from '../db.js';

export default async function handler(req, res) {
  // POST isteği olup olmadığını kontrol etme
  if (req.method === 'POST') {
    // İstekten verileri alma
    const { ad_soyad, mail_adresi, urun_adi, fiyat_tipi, istenen_fiyat, send_mail } = req.body;

    try {
      // Veritabanına yeni kayıt ekleme
      const client = await db.connect();
      const query = `
        INSERT INTO PriceReminder (ad_soyad, mail_adresi, urun_adi, fiyat_tipi, istenen_fiyat, send_mail)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const values = [ad_soyad, mail_adresi, urun_adi, fiyat_tipi, istenen_fiyat, send_mail];
      await client.query(query, values);
      client.release();

      // Başarılı yanıt gönderme
      res.status(201).json({ message: 'Yeni kayıt oluşturuldu.' });
    } catch (error) {
      console.error('Kayıt oluşturma hatası:', error);
      // Hata durumunda yanıt gönderme
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Desteklenmeyen HTTP metodu durumunda yanıt gönderme
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
