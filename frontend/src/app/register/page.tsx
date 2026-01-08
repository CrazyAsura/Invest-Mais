'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  ToggleButton, 
  ToggleButtonGroup,
  useTheme,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { registerUser, clearError } from '@/lib/redux/features/authSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  document: z.string().min(11, 'Documento inválido'),
  zipCode: z.string().min(8, 'CEP inválido'),
  country: z.string(),
  state: z.string().min(2, 'Estado inválido'),
  city: z.string().min(2, 'Cidade inválida'),
  addressNumber: z.string().min(1, 'Número é obrigatório'),
  phoneDdi: z.string(),
  phoneDdd: z.string().min(2, 'DDD inválido'),
  phoneNumber: z.string().min(8, 'Telefone inválido'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [userType, setUserType] = useState<'PF' | 'PJ'>('PF');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      country: 'Brasil',
      phoneDdi: '+55',
    }
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleUserTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: 'PF' | 'PJ',
  ) => {
    if (newType !== null) {
      setUserType(newType);
      reset((values) => ({ ...values, document: '' }));
    }
  };

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const resultAction = await dispatch(registerUser({ ...data, type: userType }));
    if (registerUser.fulfilled.match(resultAction)) {
      router.push('/login?registered=true');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#050505', 
      pt: 12, 
      pb: 8,
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)'
    }}>
      <Container maxWidth="md">
        <Paper elevation={24} sx={{ 
          p: { xs: 3, md: 6 }, 
          backgroundColor: '#0a0a0a', 
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: 4
        }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 700, fontFamily: 'serif' }}>
            Abra sua Conta InvestMais
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: '#aaa', mb: 4 }}>
            Preencha os dados abaixo para iniciar sua jornada no mercado de luxo
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>Tipo de Conta</Typography>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={handleUserTypeChange}
              sx={{ 
                '& .MuiToggleButton-root': {
                  color: '#888',
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                  px: 4,
                  '&.Mui-selected': {
                    color: '#000',
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }
                }
              }}
            >
              <ToggleButton value="PF">Pessoa Física</ToggleButton>
              <ToggleButton value="PJ">Pessoa Jurídica</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1, fontSize: '1rem' }}>Dados Pessoais</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Nome Completo / Razão Social"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="E-mail"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label={userType === 'PF' ? 'CPF' : 'CNPJ'}
                  {...register('document')}
                  error={!!errors.document}
                  helperText={errors.document?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>

              <Grid size={12}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 2, mb: 1, fontSize: '1rem' }}>Endereço</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="CEP"
                  {...register('zipCode')}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Cidade"
                  {...register('city')}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Estado (UF)"
                  {...register('state')}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Número"
                  {...register('addressNumber')}
                  error={!!errors.addressNumber}
                  helperText={errors.addressNumber?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>

              <Grid size={12}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 2, mb: 1, fontSize: '1rem' }}>Contato</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  label="DDD"
                  {...register('phoneDdd')}
                  error={!!errors.phoneDdd}
                  helperText={errors.phoneDdd?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 9 }}>
                <TextField
                  fullWidth
                  label="Telefone"
                  {...register('phoneNumber')}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  variant="outlined"
                  sx={{ input: { color: '#fff' }, label: { color: '#888' }, '& .MuiOutlinedInput-root fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' } }}
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ 
                mt: 6, 
                py: 2,
                fontWeight: 700,
                fontSize: '1.1rem',
                backgroundColor: theme.palette.primary.main,
                color: '#000',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Finalizar Cadastro'}
            </Button>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#888' }}>
              Já possui conta?{' '}
              <Link href="/login" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 600 }}>
                Faça login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
