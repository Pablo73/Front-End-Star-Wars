import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Checkout from '../pages/Checkout';

describe('Checkout Component', () => {
  it('should render the form correctly', async () => {

    render(<Checkout />)

    expect(screen.getByText('NOME')).toBeInTheDocument();
    expect(screen.getByText('EMAIL')).toBeInTheDocument();
    expect(screen.getByText('TELEFONE')).toBeInTheDocument();
    expect(screen.getByText('CPF ou CNPJ')).toBeInTheDocument();
    expect(screen.getByText('CEP')).toBeInTheDocument();
    expect(screen.getByText('RUA')).toBeInTheDocument();
    expect(screen.getByText('NÚMERO')).toBeInTheDocument();
    expect(screen.getByText('COMPLEMENTO')).toBeInTheDocument();
    expect(screen.getByText('BAIRRO')).toBeInTheDocument();
    expect(screen.getByText('CIDADE')).toBeInTheDocument();
    expect(screen.getByText('UF')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });

  it('should show error messages for required fields', async () => {
    render(<Checkout />);

    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    await waitFor(() => {
      expect(screen.getByTestId('email')).toBeInTheDocument();
    });

  });
});
