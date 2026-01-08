'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Button, 
  Divider,
  CircularProgress,
  useTheme
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';

export default function ProfilePage() {
  const theme = useTheme();
  const router = useRouter();
  const { isLoggedIn, user: reduxUser } = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
          setUser(data);
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn, router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#050505' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) return null;

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: theme.palette.primary.main, fontSize: 32 }}>
                {user.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, fontFamily: 'serif' }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
                  Cliente Premium {user.type}
                </Typography>
              </Box>
            </Box>
            <Button 
              variant="outlined" 
              startIcon={<EditIcon />}
              onClick={() => router.push('/profile/edit')}
              sx={{ borderRadius: '20px' }}
            >
              Editar Perfil
            </Button>
          </Box>

          <Divider sx={{ mb: 4, borderColor: 'rgba(212, 175, 55, 0.1)' }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <PersonIcon color="primary" />
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>E-mail</Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>{user.email}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <BusinessIcon color="primary" />
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                    {user.type === 'PF' ? 'CPF' : 'CNPJ'}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>{user.document}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>Telefone</Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>
                    {user.phoneDdi} ({user.phoneDdd}) {user.phoneNumber}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <LocationOnIcon color="primary" />
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>CEP</Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>{user.zipCode}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <LocationOnIcon color="primary" />
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>Endereço</Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>
                    {user.city}, {user.state} - {user.country}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#aaa' }}>Número: {user.addressNumber}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
