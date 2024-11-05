require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./app/config/db');

// Importa las rutas de autenticación
const authRoutes = require('./app/routes/authRoutes');

// Importa las rutas del proyecto
const projectRoutes = require('./app/routes/projectRoutes'); // Asegúrate de que esta ruta sea correcta

app.use(cors());
app.use(express.json());

// Ruta de autenticación
app.use('/', authRoutes);

// Ruta de Stripe
const stripeController = require('./app/controllers/StripeController');
app.post('/create-payment-intent', stripeController.createPaymentIntent);

// Rutas de proyectos
app.use('/api/projects', projectRoutes); // Configura la ruta para proyectos

// Ruta raíz para verificar el estado de la API
app.get('/', (req, res) => res.send('API Running'));

// Iniciar el servidor
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
