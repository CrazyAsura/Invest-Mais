'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Slider, 
  TextField, 
  Button, 
  Card, 
  Divider,
  useTheme,
  InputAdornment,
  Dialog,
  DialogContent,
  CircularProgress,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { apiClient } from '@/lib/api/api-client';
import CheckoutForm from '../ui/components/payments/checkout-form';

const stripePromise = loadStripe('pk_test_51RkPjOFsufyn0ZvPvgoYDuYAlwsYQPwO6Mio9PBMfd3wsZjQmzO3Emy1GdS7rSd0XY0lQ8hLcRyu7Svj213DAG5Q00p2RefCcW');

export default function SimularEmprestimo() {
  const theme = useTheme();
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(12);
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  // Valores meramente ilustrativos para o visual
  const interestRate = 1.49;
  const monthlyPayment = (amount * (1 + (interestRate / 100) * months)) / months;
  const totalAmount = monthlyPayment * months;
  const openingFee = amount * 0.02; // 2% de taxa de abertura

  const handleStartContraction = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    setLoadingCheckout(true);
    try {
      const response = await apiClient<{ clientSecret: string }>('/payments/create-intent', {
        method: 'POST',
        body: { amount: openingFee }
      } as any);
      setClientSecret(response.clientSecret);
      setShowCheckout(true);
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoadingCheckout(false);
    }
  };

  const handleLoanSuccess = async () => {
    try {
      await apiClient('/loans', {
        method: 'POST',
        body: {
          amount,
          installments: months,
          interestRate,
        }
      } as any);
      alert('Solicitação de empréstimo enviada com sucesso! Você será redirecionado para seu perfil.');
      window.location.href = '/profile';
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
      alert('Pagamento confirmado, mas erro ao registrar empréstimo. Entre em contato com o suporte.');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#000000', minHeight: '100vh', pt: 12, pb: 10 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', letterSpacing: 2 }}>
              Crédito Sob Medida
            </Typography>
            <Typography variant="h2" sx={{ color: '#FFFFFF', fontFamily: 'serif', mt: 1, mb: 3 }}>
              Simulador de Empréstimo
            </Typography>
            <Typography variant="body1" sx={{ color: '#AAAAAA', maxWidth: 700, mx: 'auto' }}>
              Taxas exclusivas e aprovação ágil para você realizar seus projetos com a solidez do InvestMais.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                p: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                borderRadius: 4,
              }}
            >
              <Box sx={{ mb: 6 }}>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, fontWeight: 600 }}>
                  Quanto você precisa?
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Typography sx={{ color: theme.palette.primary.main }}>R$</Typography></InputAdornment>,
                    sx: { 
                      color: '#FFFFFF',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 55, 0.3)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                    }
                  }}
                />
                <Slider
                  value={amount}
                  min={1000}
                  max={500000}
                  step={1000}
                  onChange={(_, val) => setAmount(val as number)}
                  sx={{ mt: 3, color: theme.palette.primary.main }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: '#666' }}>R$ 1.000</Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>R$ 500.000</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, fontWeight: 600 }}>
                  Em quantos meses deseja pagar?
                </Typography>
                <Slider
                  value={months}
                  min={6}
                  max={60}
                  step={6}
                  marks
                  valueLabelDisplay="on"
                  onChange={(_, val) => setMonths(val as number)}
                  sx={{ color: theme.palette.primary.main }}
                />
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                p: 4,
                height: '100%',
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6" align="center" sx={{ color: '#FFFFFF', mb: 4 }}>
                Resumo da Simulação
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ color: '#AAAAAA' }}>Valor do Empréstimo:</Typography>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>R$ {amount.toLocaleString('pt-BR')}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ color: '#AAAAAA' }}>Parcelas:</Typography>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>{months}x</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ color: '#AAAAAA' }}>Taxa de Juros:</Typography>
                <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{interestRate}% a.m.</Typography>
              </Box>

              <Divider sx={{ my: 3, borderColor: 'rgba(212, 175, 55, 0.2)' }} />

              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="caption" sx={{ color: '#AAAAAA', display: 'block', mb: 1 }}>Valor da Parcela</Typography>
                <Typography variant="h3" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', fontFamily: 'serif' }}>
                  R$ {monthlyPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Box>

              <Box sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 2, mb: 4 }}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#888' }}>Taxa de Abertura (2%):</Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>R$ {openingFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Typography>
                 </Box>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleStartContraction}
                disabled={loadingCheckout}
                sx={{ 
                  py: 2, 
                  backgroundColor: theme.palette.primary.main, 
                  color: '#000',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: theme.palette.primary.dark }
                }}
              >
                {loadingCheckout ? <CircularProgress size={24} color="inherit" /> : 'Contratar Agora'}
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Dialog 
          open={showCheckout} 
          onClose={() => setShowCheckout(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { backgroundColor: '#0a0a0a', border: '1px solid #d4af37', p: 2 }
          }}
        >
          <DialogContent>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
                <CheckoutForm amount={openingFee} onSuccess={handleLoanSuccess} />
              </Elements>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
