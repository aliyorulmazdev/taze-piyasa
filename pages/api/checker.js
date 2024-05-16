import axios from 'axios';
import { Resend } from 'resend';
import prisma from '../../prisma/client/db.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const formattedDate = new Date().toISOString().split('T')[0];
            const response = await axios.get(`https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/${formattedDate}`);
            const data = response.data;

            const reminders = await prisma.PriceReminder.findMany();

            for (const row of reminders) {
                for (const item of data.HalFiyatListesi) {
                    if (item.MalAdi === row.urunAdi) {
                        let price;
                        if (row.fiyatTipi === 'Average') {
                            price = item.OrtalamaUcret;
                        } else if (row.fiyatTipi === 'Maximum') {
                            price = item.AzamiUcret;
                        } else if (row.fiyatTipi === 'Minimum') {
                            price = item.AsgariUcret;
                        }
                        console.log(`${row.adSoyad} - Ürün - ${row.urunAdi} - İstenen Fiyat - ${row.istenenFiyat} - ${row.fiyatTipi} - CurrentPrice: ${price}`);
                        if (price <= row.istenenFiyat) {
                            // E-posta gönderimi
                            await sendEmail(row.mailAdresi);
                            // İlgili veritabanı satırını silme işlemi
                            await prisma.PriceReminder.delete({ where: { id: row.id } });
                            // .600 bekleme
                            await delay(600);
                        }
                    }
                }
            }

            await prisma.$disconnect();

            res.status(200).json({ message: 'İşlem tamamlandı.' });
        } catch (error) {
            console.error('İstek hatası:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
