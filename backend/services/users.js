const db = require('../db');
const bcrypt = require('bcrypt');

const getAllUsers = callback => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const createUser = async (name, email, password, callback) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, { id: result.insertId, name, email});
  });
};

const getUserById = (id, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]);
  });
};

const updateUser = (id, name, email, password, callback) => {
  const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
  db.query(query, [name, email, password, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, { id, name, email, password });
  });
};

const deleteUser = (id, callback) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, { message: 'User deleted successfully' });
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};