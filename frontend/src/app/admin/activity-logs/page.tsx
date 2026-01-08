'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Alert,
} from '@mui/material';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/lib/api/admin';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ActivityLogsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['activityLogs', page, rowsPerPage],
    queryFn: () => adminService.getActivityLogs({ page: page + 1, limit: rowsPerPage }),
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getActionColor = (action: string) => {
    switch (action.toUpperCase()) {
      case 'POST': return 'success';
      case 'PUT':
      case 'PATCH': return 'warning';
      case 'DELETE': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ py: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component={Link} href="/admin" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Voltar ao Painel
          </MuiLink>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <HistoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Logs de Atividade
          </Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 4 }}>
          Histórico de Atividades do Sistema
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Erro ao carregar os logs de atividade. Por favor, tente novamente mais tarde.
          </Alert>
        )}

        <TableContainer component={Paper} sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: 2 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Table>
                <TableHead sx={{ backgroundColor: '#fafafa' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Data/Hora</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Usuário</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Módulo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Ação</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>URL</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>IP</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Detalhes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data.map((log: any) => (
                    <TableRow key={log.id} hover>
                      <TableCell>
                        {format(new Date(log.createdAt), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {log.user?.name || 'Sistema'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {log.user?.email || '-'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={log.module} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={log.action} 
                          size="small" 
                          color={getActionColor(log.action) as any}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Tooltip title={log.url}>
                          <Typography variant="body2">{log.url}</Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Ver Dados Enviados">
                          <IconButton size="small" onClick={() => console.log(log.details)}>
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!data?.data || data.data.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                        Nenhum registro de atividade encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data?.meta?.totalItems || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Linhas por página"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              />
            </>
          )}
        </TableContainer>
      </Container>
    </Box>
  );
}
