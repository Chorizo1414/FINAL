const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


  router.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users'); // Asegúrate de que la tabla `users` existe
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al conectar a la base de datos' });
    }
  });
  
  
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
