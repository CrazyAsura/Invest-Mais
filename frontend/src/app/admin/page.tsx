'use client';

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  People as PeopleIcon,
  AccountBalance as LoanIcon,
  History as HistoryIcon,
  Dashboard as DashboardIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/lib/api/admin';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminPage() {
  const [tabValue, setTabValue] = useState(0);
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: adminService.getStats,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['adminUsers', 1],
    queryFn: () => adminService.getUsers(1, 50),
    enabled: tabValue === 1,
  });

  const { data: loans, isLoading: loansLoading } = useQuery({
    queryKey: ['adminLoans', 1],
    queryFn: () => adminService.getLoans(1, 50),
    enabled: tabValue === 2,
  });

  const { data: logs, isLoading: logsLoading } = useQuery({
    queryKey: ['adminLogs', 1],
    queryFn: () => adminService.getActivityLogs(1, 50),
    enabled: tabValue === 3,
  });

  const updateLoanMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminService.updateLoanStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminLoans'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (statsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
        Painel de Controle Admin
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1e1e1e', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography color="gray" variant="overline">Total Usuários</Typography>
                <PeopleIcon color="primary" />
              </Box>
              <Typography variant="h4">{stats?.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1e1e1e', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography color="gray" variant="overline">Total Empréstimos</Typography>
                <LoanIcon color="secondary" />
              </Box>
              <Typography variant="h4">{stats?.totalLoans}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1e1e1e', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography color="gray" variant="overline">Pendentes</Typography>
                <RefreshIcon sx={{ color: '#ff9800' }} />
              </Box>
              <Typography variant="h4">{stats?.pendingLoans}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1e1e1e', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography color="gray" variant="overline">Volume Total</Typography>
                <Typography variant="h6" color="success">R$</Typography>
              </Box>
              <Typography variant="h4">
                {stats?.totalLoanAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', bgcolor: '#1e1e1e', color: 'white' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<DashboardIcon />} label="Geral" />
          <Tab icon={<PeopleIcon />} label="Usuários" />
          <Tab icon={<LoanIcon />} label="Empréstimos" />
          <Tab icon={<HistoryIcon />} label="Logs de Atividade" />
        </Tabs>

        {/* Tab 0: Geral */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>Bem-vindo ao Painel Administrativo</Typography>
          <Typography variant="body1">
            Aqui você pode gerenciar todos os aspectos do Banco InvestMais, desde aprovação de empréstimos até monitoramento de atividades dos usuários.
          </Typography>
        </TabPanel>

        {/* Tab 1: Usuários */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table sx={{ color: 'white' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'gray' }}>Nome</TableCell>
                  <TableCell sx={{ color: 'gray' }}>E-mail</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Tipo</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Cadastro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.data.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      <Chip label={user.type} size="small" color={user.type === 'PJ' ? 'secondary' : 'default'} />
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Tab 2: Empréstimos */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'gray' }}>Usuário</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Valor</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Parcelas</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Status</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans?.data.map((loan: any) => (
                  <TableRow key={loan.id}>
                    <TableCell sx={{ color: 'white' }}>{loan.user?.name || 'N/A'}</TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      R$ {parseFloat(loan.amount).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>{loan.installments}x</TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      <Chip
                        label={loan.status}
                        size="small"
                        color={
                          loan.status === 'APPROVED' ? 'success' :
                          loan.status === 'PENDING' ? 'warning' : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {loan.status === 'PENDING' && (
                        <Box display="flex" gap={1}>
                          <Tooltip title="Aprovar">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => updateLoanMutation.mutate({ id: loan.id, status: 'APPROVED' })}
                            >
                              <CheckIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Rejeitar">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => updateLoanMutation.mutate({ id: loan.id, status: 'REJECTED' })}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Tab 3: Logs */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Logs de Atividade</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<OpenInNewIcon />}
               component={Link}
               href="/admin/activity-logs"
             >
              Ver Logs Completos
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'gray' }}>Data</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Ação</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Módulo</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Usuário</TableCell>
                  <TableCell sx={{ color: 'gray' }}>IP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs?.data.map((log: any) => (
                  <TableRow key={log.id}>
                    <TableCell sx={{ color: 'white' }}>
                      {new Date(log.createdAt).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>{log.action}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{log.module}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{log.user?.email || 'Sistema'}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{log.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
}
