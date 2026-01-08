import HeroCarousel from "./ui/components/home/hero-carousel";
import { Box, Container, Typography, Grid } from "@mui/material";
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function Home() {
  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#D4AF37' }} />,
      title: 'Segurança Máxima',
      description: 'Proteção de ponta a ponta para seus ativos e dados pessoais.'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#D4AF37' }} />,
      title: 'Alta Rentabilidade',
      description: 'Opções de investimento selecionadas pelos nossos melhores analistas.'
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#D4AF37' }} />,
      title: 'Suporte 24/7',
      description: 'Atendimento exclusivo e especializado a qualquer hora do dia.'
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#000000' }}>
      <HeroCarousel />
      
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: '#D4AF37', fontWeight: 'bold', letterSpacing: 2 }}>
            Por que escolher o InvestMais?
          </Typography>
          <Typography variant="h3" sx={{ color: '#FFFFFF', fontFamily: 'serif', mt: 1 }}>
            Experiência Bancária de Elite
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(212, 175, 55, 0.1)',
                  borderRadius: 4,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    backgroundColor: 'rgba(212, 175, 55, 0.05)',
                    borderColor: '#D4AF37'
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#AAAAAA', lineHeight: 1.7 }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
