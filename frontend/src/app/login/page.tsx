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
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loginUser, clearError } from '@/lib/redux/features/authSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isLoggedIn } = useSelector((state: RootState) => state.auth);
  
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (searchParams.get('registered')) {
      setSuccess('Cadastro realizado com sucesso! Faça login para continuar.');
    }
    dispatch(clearError());
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const onSubmit = async (data: LoginFormValues) => {
    setSuccess(null);
    dispatch(loginUser(data));
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
            InvestMais
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: '#aaa', mb: 3 }}>
            Acesse sua conta exclusiva
          </Typography>

          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="E-mail"
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.3)' },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                },
                input: { color: '#fff' },
                label: { color: '#888' }
              }}
            />
            <TextField
              fullWidth
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#888' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.3)' },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                },
                input: { color: '#fff' },
                label: { color: '#888' }
              }}
            />

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/forgot-password" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontSize: '0.875rem' }}>
                Esqueceu a senha?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ 
                mt: 4, 
                py: 1.5,
                fontWeight: 600,
                fontSize: '1rem',
                backgroundColor: theme.palette.primary.main,
                color: '#000',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#888' }}>
              Não possui uma conta?{' '}
              <Link href="/register" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 600 }}>
                Abra sua conta agora
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
