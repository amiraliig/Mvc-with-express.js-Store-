const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'app',
  password: 'Test123456',
  database: 'node_complete'
});

module.exports = pool;
