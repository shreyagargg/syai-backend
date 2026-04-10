const cron = require('node-cron');
import { pool } from "../config/db.js";

cron.schedule('*/5 * * * *', async () => { // every 5 minutes for demo
  console.log('Running subscription expiry job...');
  try {
    const result = await pool.query(
      `UPDATE subscriptions
       SET status = 'expired', updated_at = NOW()
       WHERE status = 'active' AND end_date < NOW()`
    );
    console.log(`Expired ${result.rowCount} subscriptions`);
  } catch (err) {
    console.error('Cron job failed:', err);
  }
});