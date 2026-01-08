'use client';

import React, { useState } from 'react';
import { 
  PaymentElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { 
  Button, 
  Box, 
  Typography, 
  CircularProgress, 
  Alert 
} from '@mui/material';

interface CheckoutFormProps {
  amount: number;
  onSuccess?: () => void;
}

export default function CheckoutForm({ amount, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/profile`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message ?? 'Ocorreu um erro inesperado.');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Pagamento realizado com sucesso!');
      if (onSuccess) onSuccess();
    } else {
      setMessage('Ocorreu um erro inesperado.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 3 }}>
        Finalizar Pagamento - R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </Typography>
      
      <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
        <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      </Box>

      <Button
        disabled={isLoading || !stripe || !elements}
        fullWidth
        variant="contained"
        type="submit"
        sx={{ 
          py: 1.5,
          backgroundColor: '#d4af37',
          color: '#000',
          fontWeight: 700,
          '&:hover': { backgroundColor: '#b8962e' },
          '&:disabled': { backgroundColor: 'rgba(212, 175, 55, 0.3)' }
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Pagar Agora'}
      </Button>

      {message && (
        <Alert severity={message.includes('sucesso') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </form>
  );
}
