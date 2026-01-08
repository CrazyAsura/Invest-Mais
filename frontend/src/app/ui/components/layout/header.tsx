'use client';

import React from 'react';
import Link from 'next/link';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/features/authSlice';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CalculateIcon from '@mui/icons-material/Calculate';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const MotionBox = motion(Box);

export default function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'admin';
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { label: 'Início', path: '/' },
    { label: 'Quem Somos', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: '#000000', 
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MotionBox
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <AccountBalanceWalletIcon sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 32 }} />
            </MotionBox>
            
            <MotionBox whileHover={{ scale: 1.05 }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: 'serif',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                InvestMais
              </Typography>
            </MotionBox>
          </Box>

          {/* Menu Desktop */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.path}
                sx={{ 
                  color: '#FFFFFF', 
                  fontWeight: 500,
                  '&:hover': { color: theme.palette.primary.main }
                }}
              >
                {item.label}
              </Button>
            ))}

            {mounted && isLoggedIn && (
              <>
                {isAdmin && (
                  <MotionBox whileHover={{ scale: 1.05 }}>
                    <Button
                      component={Link}
                      href="/admin"
                      startIcon={<AdminPanelSettingsIcon />}
                      sx={{ color: theme.palette.primary.main, mr: 1, fontWeight: 'bold' }}
                    >
                      Admin
                    </Button>
                  </MotionBox>
                )}
                <MotionBox whileHover={{ scale: 1.05 }}>
                  <Button
                    component={Link}
                    href="/profile"
                    startIcon={<PersonIcon />}
                    sx={{ color: '#FFFFFF', mr: 1 }}
                  >
                    {user?.name.split(' ')[0]}
                  </Button>
                </MotionBox>
                <MotionBox whileHover={{ scale: 1.05 }}>
                  <Button
                    component={Link}
                    href="/simular-emprestimo"
                    startIcon={<CalculateIcon />}
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: '20px', ml: 1 }}
                  >
                    Simular Empréstimo
                  </Button>
                </MotionBox>
              </>
            )}

            <Box sx={{ ml: 4, borderLeft: '1px solid #333', pl: 3, display: 'flex', gap: 2 }}>
              {!mounted ? (
                <Box sx={{ width: 100 }} /> 
              ) : isLoggedIn ? (
                <Button
                  onClick={() => dispatch(logout())}
                  startIcon={<LogoutIcon />}
                  variant="text"
                  sx={{ color: '#FFFFFF', '&:hover': { color: theme.palette.primary.main } }}
                >
                  Sair
                </Button>
              ) : (
                <MotionBox whileHover={{ scale: 1.05 }}>
                  <Button
                    component={Link}
                    href="/login"
                    startIcon={<LoginIcon />}
                    variant="contained"
                    color="primary"
                    sx={{ 
                      fontWeight: 'bold',
                      boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    Entrar
                  </Button>
                </MotionBox>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
