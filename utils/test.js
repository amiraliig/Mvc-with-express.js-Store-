const pool = require('./database');

async function test() {
  const [rows] = await pool.execute('SELECT 1');
  console.log(rows);
}

test();
