const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

//Route for user login
router.post('/', async (req, res) => {
  console.log('User-login');
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  } 
  // try {
    const authResult = await authService.authenticateUser(email, password);
    if (authResult?.error) {
      // Handle different error cases
      if (authResult.error === 'User not found') {
        return res.status(404).json({ message: 'User not found' });
      }
      if (authResult.error === 'Invalid password') {
        return res.status(401).json({ message: 'Invalid password' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
    // Authentication successful
    res.status(200).json(authResult);
  // } catch (err) {
  //   console.error('Error during login:', err);
  //   res.status(500).json({ message: 'Internal server error' });
  // }
});


module.exports = router;
