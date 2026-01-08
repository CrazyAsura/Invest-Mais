'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  IconButton, 
  Divider,
  useTheme,
  Grid
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#000000', 
        color: '#FFFFFF',
        pt: 8,
        pb: 4,
        borderTop: `1px solid ${theme.palette.primary.main}`,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Coluna 1: Logo e Descrição */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountBalanceWalletIcon sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 32 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'serif',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: theme.palette.primary.main,
                  textTransform: 'uppercase',
                }}
              >
                InvestMais
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#AAAAAA', mb: 2, lineHeight: 1.8 }}>
              O Banco InvestMais oferece soluções inteligentes para quem busca rentabilidade, 
              segurança e um atendimento exclusivo. Transforme seu futuro financeiro conosco.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[InstagramIcon, LinkedInIcon, FacebookIcon].map((Icon, index) => (
                <IconButton 
                  key={index} 
                  sx={{ 
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      color: '#000000',
                    }
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Coluna 2: Links Rápidos */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, fontWeight: 700, mb: 3 }}>
              Navegação
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { text: 'Início', href: '/' },
                { text: 'Quem Somos', href: '/about' },
                { text: 'FAQ', href: '/faq' },
                { text: 'Privacidade', href: '#' }
              ].map((link) => (
                <Link 
                  key={link.text}
                  component={NextLink}
                  href={link.href} 
                  underline="none" 
                  sx={{ 
                    color: '#FFFFFF', 
                    fontSize: '0.9rem',
                    '&:hover': { color: theme.palette.primary.main } 
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Coluna 3: Serviços */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, fontWeight: 700, mb: 3 }}>
              Serviços
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {['Investimentos', 'Empréstimos', 'Cartões', 'Conta Digital'].map((text) => (
                <Link 
                  key={text}
                  href="#" 
                  underline="none" 
                  sx={{ 
                    color: '#FFFFFF', 
                    fontSize: '0.9rem',
                    '&:hover': { color: theme.palette.primary.main } 
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Coluna 4: Contato */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, fontWeight: 700, mb: 3 }}>
              Atendimento
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                0800 123 4567 (24h)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                contato@investmais.com.br
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 2 }}>
              Av. Paulista, 1000 - Bela Vista<br />
              São Paulo - SP, 01310-100
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#333333' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#666666' }}>
            © {currentYear} Banco InvestMais S.A. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </Typography>
          <Typography variant="caption" sx={{ color: '#666666' }}>
            Feito com excelência para o seu futuro.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
