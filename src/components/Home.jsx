import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  Pagination,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';

const StyledInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const Home = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [monthlyEmi, setMonthlyEmi] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Format currency
  const formatCurrency = (value) => {
    if (isNaN(value)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Calculate EMI and generate schedule
  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    if (principal > 0 && annualRate > 0 && numberOfPayments > 0) {
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                 (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyEmi(emi);

      // Generate amortization schedule
      let balance = principal;
      const schedule = [];

      for (let month = 1; month <= numberOfPayments; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = emi - interestPayment;
        balance -= principalPayment;

        schedule.push({
          month,
          principalPayment,
          interestPayment,
          balance: balance > 0 ? balance : 0,
          payment: emi
        });
      }

      setAmortizationSchedule(schedule);
      setCurrentPage(1);
    }
  };

  const resetCalculator = () => {
    setLoanAmount(100000);
    setInterestRate(8.5);
    setLoanTerm(5);
    setMonthlyEmi(null);
    setAmortizationSchedule([]);
    setCurrentPage(1);
  };

  // Calculate totals
  const totalInterest = amortizationSchedule.reduce((sum, payment) => sum + payment.interestPayment, 0);
  const totalPayment = amortizationSchedule.reduce((sum, payment) => sum + payment.payment, 0);

  // Pagination
  const totalPages = Math.ceil(amortizationSchedule.length / itemsPerPage);
  const currentItems = amortizationSchedule.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loan Calculator Dashboard
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { md: 'repeat(3, 1fr)' }, gap: 3, mb: 3 }}>
          <StyledInput
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            inputProps={{ min: "1" }}
          />
          <StyledInput
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            inputProps={{ min: "0.1", step: "0.1" }}
          />
          <StyledInput
            label="Term (Years)"
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            inputProps={{ min: "1" }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <StyledSelect
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            label="Currency"
          >
            <MenuItem value="USD">USD ($)</MenuItem>
            <MenuItem value="EUR">EUR (€)</MenuItem>
            <MenuItem value="GBP">GBP (£)</MenuItem>
            <MenuItem value="INR">INR (₹)</MenuItem>
          </StyledSelect>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <StyledButton variant="contained" onClick={calculateEmi}>
            CALCULATE
          </StyledButton>
          <StyledButton variant="outlined" onClick={resetCalculator}>
            RESET
          </StyledButton>
        </Box>

        {monthlyEmi !== null && (
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Monthly EMI: {formatCurrency(monthlyEmi)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { md: 'repeat(3, 1fr)' }, gap: 3 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Total Payment</Typography>
                <Typography>{formatCurrency(totalPayment)}</Typography>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Total Interest</Typography>
                <Typography>{formatCurrency(totalInterest)}</Typography>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Loan Amount</Typography>
                <Typography>{formatCurrency(loanAmount)}</Typography>
              </Paper>
            </Box>
          </StyledPaper>
        )}

        {amortizationSchedule.length > 0 && (
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Amortization Schedule</Typography>
              <Typography variant="body2" color="text.secondary">
                Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, amortizationSchedule.length)} of {amortizationSchedule.length} payments
              </Typography>
            </Box>

            <Box sx={{ overflowX: 'auto', mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Payment</TableCell>
                    <TableCell align="right">Principal</TableCell>
                    <TableCell align="right">Interest</TableCell>
                    <TableCell align="right">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((payment) => (
                    <TableRow key={payment.month}>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell align="right">{formatCurrency(payment.payment)}</TableCell>
                      <TableCell align="right">{formatCurrency(payment.principalPayment)}</TableCell>
                      <TableCell align="right">{formatCurrency(payment.interestPayment)}</TableCell>
                      <TableCell align="right">{formatCurrency(payment.balance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </StyledPaper>
        )}
      </Container>
    </>
  );
};

export default Home;