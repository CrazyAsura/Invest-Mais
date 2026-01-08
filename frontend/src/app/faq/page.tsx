'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Como faço para abrir uma conta no InvestMais?',
    answer: 'Para abrir sua conta, basta clicar no botão "Abrir Conta" em nossa home page, preencher seus dados básicos e enviar uma foto do seu documento de identidade. O processo é 100% digital e leva menos de 5 minutos.'
  },
  {
    question: 'Quais são as taxas de manutenção de conta?',
    answer: 'O InvestMais acredita na transparência. Nossa conta digital básica é isenta de mensalidade. Para contas Premium e Private, existem benefícios exclusivos com taxas competitivas que podem ser zeradas conforme seu volume de investimentos.'
  },
  {
    question: 'O InvestMais é seguro?',
    answer: 'Sim, somos uma instituição autorizada pelo Banco Central do Brasil e todos os depósitos em conta corrente e investimentos em Renda Fixa contam com a proteção do FGC (Fundo Garantidor de Créditos) até os limites regulamentares.'
  },
  {
    question: 'Como funcionam os investimentos?',
    answer: 'Oferecemos uma plataforma completa com acesso a Tesouro Direto, CDBs, LCIs, LCAs, Fundos de Investimento e Home Broker para ações e FIIs. Nossos especialistas estão disponíveis para ajudar você a montar a melhor carteira para seu perfil.'
  },
  {
    question: 'Qual o horário de atendimento do suporte?',
    answer: 'Nosso suporte funciona 24 horas por dia, 7 dias por semana, através do chat no aplicativo, e-mail ou telefone. Clientes Private possuem ainda um gerente de relacionamento dedicado com atendimento personalizado.'
  }
];

export default function FAQ() {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: '#000000', minHeight: '100vh', pt: 12, pb: 10 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', letterSpacing: 2 }}>
              Dúvidas Frequentes
            </Typography>
            <Typography variant="h2" sx={{ color: '#FFFFFF', fontFamily: 'serif', mt: 1, mb: 3 }}>
              Como podemos ajudar?
            </Typography>
            <Typography variant="body1" sx={{ color: '#AAAAAA', maxWidth: 600, mx: 'auto' }}>
              Encontre respostas rápidas para as principais perguntas sobre nossos serviços, 
              segurança e investimentos.
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ mt: 4 }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Accordion 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                  color: '#FFFFFF',
                  mb: 2,
                  border: '1px solid rgba(212, 175, 55, 0.1)',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: 'rgba(212, 175, 55, 0.05)',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
                  sx={{ py: 1 }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pb: 3 }}>
                  <Typography variant="body1" sx={{ color: '#AAAAAA', lineHeight: 1.8 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
