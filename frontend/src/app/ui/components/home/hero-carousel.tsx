'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  {
    id: 1,
    title: 'O Futuro dos seus Investimentos',
    description: 'Rentabilidade e segurança para você conquistar seus maiores objetivos com a exclusividade InvestMais.',
    buttonText: 'Abrir Conta Premium',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070',
    color: '#D4AF37'
  },
  {
    id: 2,
    title: 'Crédito Inteligente e Personalizado',
    description: 'Soluções de crédito com as melhores taxas do mercado para impulsionar seus projetos hoje.',
    buttonText: 'Simular Empréstimo',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=1973',
    color: '#FFFFFF'
  },
  {
    id: 3,
    title: 'Atendimento Private Banking',
    description: 'Uma equipe de especialistas dedicada a gerir seu patrimônio com discrição e sofisticação.',
    buttonText: 'Conhecer Exclusividade',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    color: '#D4AF37'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <Box sx={{ position: 'relative', height: '80vh', width: '100%', overflow: 'hidden', backgroundColor: '#000' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url(${slides[current].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 600 }}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: '#FFFFFF',
                    fontFamily: 'serif',
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  {slides[current].title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#CCCCCC',
                    mb: 4,
                    lineHeight: 1.6,
                    fontWeight: 300
                  }}
                >
                  {slides[current].description}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: slides[current].color === '#FFFFFF' ? '#FFFFFF' : '#D4AF37',
                    color: '#000000',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: '#B8972F',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {slides[current].buttonText}
                </Button>
              </motion.div>
            </Box>
          </Container>
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255,255,255,0.3)',
          '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.2)', borderColor: '#D4AF37' }
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255,255,255,0.3)',
          '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.2)', borderColor: '#D4AF37' }
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Indicadores */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: current === index ? 40 : 12,
              height: 4,
              backgroundColor: current === index ? '#D4AF37' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: 2
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
