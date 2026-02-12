const pool = require('./database');

async function test() {
  const [rows] = await pool.execute('SELECT 1');
  
}

test();
