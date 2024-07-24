const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'smartant',
  database: 'usersCrud',
});

module.exports = db;