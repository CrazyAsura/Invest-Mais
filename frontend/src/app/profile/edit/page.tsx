'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  useTheme,
  Alert,
  CircularProgress
} from '@mui/material';
import { IMaskInput } from 'react-imask';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { updateUser } from '@/lib/redux/features/authSlice';

const TextMaskCustom = React.forwardRef<HTMLInputElement, any>(function TextMaskCustom(
  props,
  ref,
) {
  const { onChange, mask, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function EditProfilePage() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: 'PF',
    document: '',
    zipCode: '',
    country: 'Brasil',
    state: '',
    city: '',
    addressNumber: '',
    phoneDdi: '+55',
    phoneDdd: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/users/profile', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao atualizar perfil');
      }

      const updatedUser = await response.json();
      dispatch(updateUser({ 
        name: updatedUser.name, 
        type: updatedUser.type 
      }));
      
      setSuccess(true);
      setTimeout(() => router.push('/profile'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#050505' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

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
          p: 4, 
          backgroundColor: '#0a0a0a', 
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: 4
        }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 700, fontFamily: 'serif' }}>
            Editar Perfil
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>Perfil atualizado com sucesso! Redirecionando...</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Conta</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    label="Tipo de Conta"
                    onChange={handleChange as any}
                  >
                    <MenuItem value="PF">Pessoa Física</MenuItem>
                    <MenuItem value="PJ">Pessoa Jurídica</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={formData.type === 'PF' ? 'CPF' : 'CNPJ'}
                  name="document"
                  value={formData.document}
                  onChange={handleChange}
                  required
                  InputProps={{
                    inputComponent: TextMaskCustom as any,
                    inputProps: { mask: formData.type === 'PF' ? '000.000.000-00' : '00.000.000/0000-00' }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 2, mb: 1 }}>
                  Endereço
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  InputProps={{
                    inputComponent: TextMaskCustom as any,
                    inputProps: { mask: '00000-000' }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>País</InputLabel>
                  <Select
                    name="country"
                    value={formData.country}
                    label="País"
                    onChange={handleChange as any}
                  >
                    <MenuItem value="Brasil">Brasil</MenuItem>
                    <MenuItem value="Portugal">Portugal</MenuItem>
                    <MenuItem value="EUA">EUA</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Estado"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Número"
                  name="addressNumber"
                  value={formData.addressNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, mt: 2, mb: 1 }}>
                  Contato
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>DDI</InputLabel>
                  <Select
                    name="phoneDdi"
                    value={formData.phoneDdi}
                    label="DDI"
                    onChange={handleChange as any}
                  >
                    <MenuItem value="+55">+55 (BR)</MenuItem>
                    <MenuItem value="+351">+351 (PT)</MenuItem>
                    <MenuItem value="+1">+1 (US)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="DDD"
                  name="phoneDdd"
                  value={formData.phoneDdd}
                  onChange={handleChange}
                  required
                  InputProps={{
                    inputComponent: TextMaskCustom as any,
                    inputProps: { mask: '00' }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Número"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  InputProps={{
                    inputComponent: TextMaskCustom as any,
                    inputProps: { mask: '00000-0000' }
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={() => router.push('/profile')}
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  sx={{ 
                    fontWeight: 'bold', 
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
                  }}
                >
                  {saving ? <CircularProgress size={24} color="inherit" /> : 'SALVAR ALTERAÇÕES'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
