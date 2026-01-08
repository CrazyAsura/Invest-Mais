'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  useTheme,
  Alert,
  CircularProgress
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const theme = useTheme();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3001/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar solicitação');
      }

      setSuccess(data.message);
      
      // Simulação: Se retornamos o token (apenas para fins de demo/desenvolvimento)
      if (data.resetToken) {
        console.log('Reset Token (Demo):', data.resetToken);
        // Em um cenário real, o usuário clicaria no link do e-mail: /reset-password?token=...
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#050505', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pt: 12, 
      pb: 8,
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)'
    }}>
      <Container maxWidth="xs">
        <Paper elevation={24} sx={{ 
          p: 4, 
          backgroundColor: '#0a0a0a', 
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: 4
        }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 700, fontFamily: 'serif' }}>
            Recuperar Senha
          </Typography>
          <Typography variant="body1" align="center" sx={{ color: '#AAAAAA', mb: 4 }}>
            Informe seu e-mail cadastrado para receber as instruções.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ 
                  py: 1.5, 
                  fontWeight: 'bold', 
                  fontSize: '1.1rem',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'ENVIAR INSTRUÇÕES'}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Link href="/login" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Voltar para o Login
                </Link>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
