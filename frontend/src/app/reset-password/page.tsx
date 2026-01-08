'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  useTheme,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ResetPasswordPage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Token de recuperação ausente ou inválido.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3001/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao redefinir senha');
      }

      setSuccess('Senha redefinida com sucesso! Redirecionando para o login...');
      setTimeout(() => router.push('/login'), 3000);
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
            Nova Senha
          </Typography>
          <Typography variant="body1" align="center" sx={{ color: '#AAAAAA', mb: 4 }}>
            Crie uma senha forte para sua segurança.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Nova Senha"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={!token}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#666' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={!token}
              />

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading || !token}
                sx={{ 
                  py: 1.5, 
                  fontWeight: 'bold', 
                  fontSize: '1.1rem',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'REDEFINIR SENHA'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
