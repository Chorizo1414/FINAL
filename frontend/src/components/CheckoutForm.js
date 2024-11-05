import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutForm.css';

const stripePromise = loadStripe('pk_test_51Q9a2gRqSLao4U6DhgfZrCYHn3JFpiGlbm2HD2IzfK8VO6ZkgEqwh4fRVsAzEkc6iSgxW9D7PqpEcIeHIKZs4u1I00fx9gWTuE');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state;

  const [clientSecret, setClientSecret] = useState('');
  const [name, setName] = useState('');

  // Verifica que el proyecto esté presente
  useEffect(() => {
    if (!project) {
      alert('No se encontró el proyecto');
      navigate('/projects');
      return;
    }
  }, [project, navigate]);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('http://localhost:5000/create-payment-intent', {
          amount: project.costo_proyecto * 100, // Convertir a centavos
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error creando el PaymentIntent", error);
      }
    };

    if (project && project.costo_proyecto) {
      createPaymentIntent();
    }
  }, [project]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name,
          },
        },
      });

      if (error) {
        console.error('[error]', error);
        alert('Error en el pago');
      } else if (paymentIntent.status === 'succeeded') {
        alert('Pago exitoso');
        navigate('/projects');
      } else {
        alert(`Estado del pago: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error('Error en la confirmación del pago:', error);
      alert('Error en el pago');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout - {project ? project.titulo : 'Proyecto no encontrado'}</h2>
      <p>Total: ${project ? project.costo_proyecto : '0.00'}</p>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            required
          />
        </label>
        <label>
          Número de tarjeta
          <CardElement className="card-element" />
        </label>
        <button type="submit" disabled={!stripe || !clientSecret}>
          Pagar
        </button>
      </form>
      <button onClick={() => navigate('/projects')} className="back-button">
        Regresar a la página de proyectos
      </button>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
