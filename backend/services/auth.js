const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'smartGiant'; // Replace with your actual secret key

const authenticateUser = async (email, password) => {
  console.log("email, password",email, password);
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    // const rows = connection.query(query, [email]);

    const [rows] = connection.query(query, [email]);
    // const rows = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    console.log("rows:>>>>",rows);
    console.log("Array.isArray(rows):>>>>",Array.isArray([rows]),rows.length > 0);
    if (Array.isArray(rows) && rows.length > 0) {
      const result = rows[0];
      const match = await bcrypt.compare(password, result.password);

      if (match) {
        const payload = {
          user: result.email,
          userId: result.id
        };

        const token = jwt.sign(payload, SECRET_KEY, {
          expiresIn: '10d' // expires in 10 days
        });

        return { user: result, token, success: true, msg: "Login Successfully" };
      } else {
        return{ success: false, msg: "Your Password is Incorrect" };
      }
    } else {
      return { success: false, msg: "Your Email is Incorrect" };
    }
  } catch (err) {
    console.error('Authentication Error:', err.message);
    return{
      status:500,
      success: false,
      message: 'An error occurred during authentication. Please try again later.'
    };
  }
};

module.exports = { authenticateUser };
