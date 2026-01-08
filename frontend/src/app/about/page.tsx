'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme,
  Avatar,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';

const values = [
  {
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    title: 'Excelência',
    description: 'Buscamos a perfeição em cada detalhe da jornada do nosso cliente.'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Confiança',
    description: 'Transparência total e segurança máxima para o seu patrimônio.'
  },
  {
    icon: <PublicIcon sx={{ fontSize: 40 }} />,
    title: 'Inovação',
    description: 'Tecnologia de ponta para simplificar e potencializar seus ganhos.'
  }
];

export default function About() {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: '#000000', minHeight: '100vh', pt: 12, pb: 10 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={6} sx={{ alignItems: 'center', mb: 12 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', letterSpacing: 2 }}>
                Nossa História
              </Typography>
              <Typography variant="h2" sx={{ color: '#FFFFFF', fontFamily: 'serif', mt: 1, mb: 3 }}>
                Redefinindo o Futuro do Private Banking
              </Typography>
              <Typography variant="body1" sx={{ color: '#AAAAAA', fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                O InvestMais nasceu da visão de que o atendimento bancário de elite deveria ser 
                mais ágil, transparente e verdadeiramente focado no cliente. Combinamos a 
                solidez das instituições tradicionais com a inovação das fintechs.
              </Typography>
              <Typography variant="body1" sx={{ color: '#AAAAAA', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Hoje, somos referência em gestão de patrimônio e investimentos, servindo milhares 
                de clientes que buscam exclusividade e rentabilidade superior em um ambiente 
                digital sofisticado.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80&w=2000"
                alt="Escritório InvestMais"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: `0 0 30px ${theme.palette.primary.main}33`,
                  border: `1px solid ${theme.palette.primary.main}66`
                }}
              />
            </Grid>
          </Grid>
        </motion.div>

        {/* Values Section */}
        <Box sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ color: '#FFFFFF', fontFamily: 'serif', mb: 2 }}>
              Nossos Valores
            </Typography>
            <Box sx={{ width: 80, height: 4, backgroundColor: theme.palette.primary.main, mx: 'auto' }} />
          </Box>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Box
                    sx={{
                      p: 6,
                      textAlign: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(212, 175, 55, 0.1)',
                      borderRadius: 4,
                      height: '100%',
                      transition: '0.3s',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: 'rgba(212, 175, 55, 0.03)',
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <Box sx={{ color: theme.palette.primary.main, mb: 3 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 700 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#AAAAAA', lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
