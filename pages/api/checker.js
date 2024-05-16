import axios from 'axios';
import db from '../db';
import { Resend } from 'resend';

const resend = new Resend('re_LBcJNsB8_DmghRPhgZGMHxjZEQvTEd3MU');

export default async function handler(req, res) {
    // GET isteği olup olmadığını kontrol etme
    if (req.method === 'GET') {
        try {
            // Tarih bilgisini al
            const formattedDate = new Date().toISOString().split('T')[0];
            // API'den veriyi al
            const response = await axios.get(`https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/${formattedDate}`);
            const data = response.data;

            // Veritabanındaki kayıtları al
            const client = await db.connect();
            const query = `SELECT * FROM PriceReminder`;
            const result = await client.query(query);
            
            for (const row of result.rows) {
                for (const item of data.HalFiyatListesi) {
                    if (item.MalAdi === row.urun_adi) {
                        let price;
                        if (row.fiyat_tipi === 'Average') {
                            price = item.OrtalamaUcret;
                        } else if (row.fiyat_tipi === 'Maximum') {
                            price = item.AzamiUcret;
                        } else if (row.fiyat_tipi === 'Minimum') {
                            price = item.AsgariUcret;
                        }

                        console.log(`${row.ad_soyad} - Ürün - ${row.urun_adi} - İstenen Fiyat - ${row.istenen_fiyat} - ${row.fiyat_tipi} - CurrentPrice: ${price}`);
                        if (price <= row.istenen_fiyat) {
                            // E-posta gönderimi
                            await sendEmail(row.mail_adresi);
                            console.log(`${row.ad_soyad} için eposta gönderildi`);
                            // İlgili veritabanı satırını silme işlemi
                            await client.query('DELETE FROM PriceReminder WHERE id = $1', [row.id]);
                        }
                    }
                }
            }

            client.release();

            // Başarılı yanıt gönderme
            res.status(200).json({ message: 'İşlem tamamlandı.' });
        } catch (error) {
            console.error('İstek hatası:', error);
            // Hata durumunda yanıt gönderme
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Desteklenmeyen HTTP metodu durumunda yanıt gönderme
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

async function sendEmail(mail) {
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: mail,
        subject: 'Fiyat Düşüş Bildirimi',
        text: 'Harika, istediğiniz fiyat düzeyine ulaşıldı.'
    });

    if (error) {
        throw new Error(`E-posta gönderim hatası: ${error.message}`);
    }

    console.log('E-posta gönderildi:', data);
}
