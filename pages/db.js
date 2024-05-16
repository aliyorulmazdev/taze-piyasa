import { Pool } from 'pg';

// PostgreSQL bağlantı URL'si
const DATABASE_URL = 'postgres://default:01rizUOdKwZc@ep-dawn-art-a2djcbbl.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require';

// PostgreSQL havuzunu oluştur
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Tablo oluşturma işlemi
async function createTable() {
  try {
    const client = await pool.connect();
    // Tablo oluşturma sorgusu
    const query = `
      CREATE TABLE IF NOT EXISTS PriceReminder (
        id SERIAL PRIMARY KEY,
        ad_soyad TEXT,
        mail_adresi TEXT,
        urun_adi TEXT,
        fiyat_tipi VARCHAR(10),
        istenen_fiyat FLOAT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_check_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        send_mail BOOLEAN
      )
    `;
    // Sorguyu yürütme
    await client.query(query);
    console.log('PriceReminder tablosu oluşturuldu.');
    // Bağlantıyı serbest bırakma
    client.release();
  } catch (err) {
    console.error('Tablo oluşturma hatası:', err);
  }
}

// Tablo oluşturma işlemini çağır
createTable();

export default pool;
