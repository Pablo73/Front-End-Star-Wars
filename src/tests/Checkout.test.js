import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Checkout from '../pages/Checkout';

describe('Checkout Component', () => {
  it('should render the form correctly', async () => {

    render(<Checkout />)

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByText('TELEFONE')).toBeInTheDocument();
    expect(screen.getByTestId('cpfCnpj')).toBeInTheDocument();
    expect(screen.getByTestId('cep')).toBeInTheDocument();
    expect(screen.getByTestId('rua')).toBeInTheDocument();
    expect(screen.getByTestId('numero')).toBeInTheDocument();
    expect(screen.getByTestId('complemento')).toBeInTheDocument();
    expect(screen.getByTestId('bairro')).toBeInTheDocument();
    expect(screen.getByTestId('cidade')).toBeInTheDocument();
    expect(screen.getByTestId('uf')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });

  it('should show error messages for required fields', async () => {
    render(<Checkout />);

    userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    const valueError = screen.getByTestId('error')
   
    expect(valueError).toBeInTheDocument();

  });
});
