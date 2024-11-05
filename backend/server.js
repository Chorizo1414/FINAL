require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./app/config/db');

// Importa las rutas de autenticación
const authRoutes = require('./app/routes/authRoutes');

app.use(cors());
app.use(express.json());

//Ruta stripe
const stripeController = require('./app/controllers/StripeController');
// Rutas de autenticación
app.use('/', authRoutes);

app.post('/create-payment-intent', stripeController.createPaymentIntent);

// Ruta raíz para verificar el estado de la API
app.get('/', (req, res) => res.send('API Running'));

// Iniciar el servidor
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
