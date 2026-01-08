'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  IconButton, 
  Paper, 
  Typography, 
  TextField, 
  Avatar, 
  Fab,
  useTheme,
  Zoom,
  Fade
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { io, Socket } from 'socket.io-client';

interface Message {
  user: string;
  message: string;
  isBot: boolean;
}

export default function Chatbot() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { user: 'IA InvestMais', message: 'Olá! Sou seu assistente virtual. Como posso ajudar você hoje?', isBot: true }
  ]);
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on('receiveMessage', (data: { user: string; message: string }) => {
      setMessages((prev) => [...prev, { ...data, isBot: true }]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && socketRef.current) {
      const userMessage = { user: 'Você', message: input, isBot: false };
      setMessages((prev) => [...prev, userMessage]);
      socketRef.current.emit('sendMessage', { message: input });
      setInput('');
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <Fab 
        color="primary" 
        aria-label="chat" 
        onClick={() => setIsOpen(!isOpen)}
        sx={{ 
          position: 'fixed', 
          bottom: 30, 
          right: 30,
          boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
          zIndex: 1000
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      {/* Janela de Chat */}
      <Zoom in={isOpen}>
        <Paper
          elevation={24}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 30,
            width: { xs: 'calc(100% - 60px)', sm: 380 },
            height: 500,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            zIndex: 1000
          }}
        >
          {/* Header do Chat */}
          <Box sx={{ p: 2, backgroundColor: theme.palette.primary.main, color: '#000', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#000', color: theme.palette.primary.main }}>
              <SmartToyIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">Assistente InvestMais</Typography>
              <Typography variant="caption">Online agora</Typography>
            </Box>
          </Box>

          {/* Mensagens */}
          <Box 
            ref={scrollRef}
            sx={{ 
              flex: 1, 
              p: 2, 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(212, 175, 55, 0.2)', borderRadius: '10px' }
            }}
          >
            {messages.map((msg, idx) => (
              <Box 
                key={idx} 
                sx={{ 
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '80%'
                }}
              >
                <Paper 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: msg.isBot ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
                    backgroundColor: msg.isBot ? 'rgba(255, 255, 255, 0.05)' : theme.palette.primary.main,
                    color: msg.isBot ? '#FFFFFF' : '#000',
                  }}
                >
                  <Typography variant="body2">{msg.message}</Typography>
                </Paper>
                <Typography variant="caption" sx={{ color: '#666', mt: 0.5, display: 'block', textAlign: msg.isBot ? 'left' : 'right' }}>
                  {msg.user}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFF',
                    borderRadius: 3,
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  }
                }}
              />
              <IconButton 
                color="primary" 
                onClick={handleSend}
                disabled={!input.trim()}
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: '#000',
                  '&:hover': { bgcolor: '#b8962f' },
                  '&.Mui-disabled': { bgcolor: 'rgba(212, 175, 55, 0.1)', color: '#666' }
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Zoom>
    </>
  );
}
