import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import '../css/checkout.css';
import { useState } from 'react';
import VehiclesTitle from './SuccesMessage';

function Checkout() {

    const [paymentMethod, setPaymentMethod] = useState('');
    const [isCard, setIsCard] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    interface CheckoutFormulários {
        name: string;
        email: string;
        telefone: string;
        cpfCnpj: string;
        cep: string;
        rua: string;
        numero: string;
        complemento: string;
        cidade: string;
        bairro: string;
        uf: string;
        cardNumber?: '';
        validity?: '';
        printedName?: '';
        cvv?: '',
    }

    const initialValues: CheckoutFormulários = {
        name: '',
        email: '',
        telefone: '',
        cpfCnpj: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        cidade: '',
        bairro: '',
        uf: '',
        cardNumber: '',
        validity: '',
        printedName: '',
        cvv: '',
    }


    const handleSubmit = (values: CheckoutFormulários, { setSubmitting }: any) => {
        console.log(values);
        setSubmitting(false);
        if (paymentMethod === '') {
            alert('Selecione um método de pagamento!');
        } else if (paymentMethod === 'ticket') {
            setIsSubmitted(true);
        } else if (paymentMethod === 'card') {
            setIsSubmitted(true);
        }

    };

    const validationSchema = Yup.object({
        email: Yup.string().email('E-mail inválido').required('Campo Obrigatório'),
        cpfCnpj: Yup.string()
            .test('cpf-cnpj-validation', 'CPF ou CNPJ inválido', (value) => {
                if (!value) return true;

                if (cpf.isValid(value) || cnpj.isValid(value)) {
                    return true;
                }
                return false;
            }).required('Campo Obrigatório'),
        cep: Yup.string()
            .matches(/^\d{5}-\d{3}$/, 'CEP inválido. Formato esperado: 12345-678')
            .required('Campo Obrigatório'),
        // cardNumber: Yup.string().when('isCard', {
        //     is: true,
        //     then: Yup.string().required('Campo Obrigatório'),
        //     otherwise: Yup.string().notRequired(),
        //     }),
});

    const fetchAddress = async (cep: string, setFieldValue: (field: string, value: string) => void) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (response.ok) {
                setFieldValue('rua', data.logradouro);
                setFieldValue('complemento', data.complemento);
                setFieldValue('bairro', data.bairro);
                setFieldValue('cidade', data.localidade);
                setFieldValue('uf', data.uf);
            } else {
                setFieldValue('rua', '');
                setFieldValue('complemento', '');
                setFieldValue('bairro', '');
                setFieldValue('cidade', '');
                setFieldValue('uf', '');
            }
        } catch (error) {
            console.error('Erro ao buscar o endereço:', error);
        }
    };


    return (
        <div className="col-75">
            {isSubmitted ? (<VehiclesTitle />) :
                (<div className="container">
                    <h1>
                        Dados Pessoais
                    </h1>
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="col-25">
                                <div>
                                    <div>
                                        <label htmlFor="name">NOME</label>
                                        <Field name='name' type='text' placeholder="Nome completo" data-testid="name" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">EMAIL</label>
                                        <ErrorMessage name="email" component="div" data-testid="error" />
                                        <Field name='email' type='text' placeholder="email@address.com" data-testid="email" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="telefone">TELEFONE</label>
                                        <PhoneInput
                                            country={'br'}
                                            inputProps={{ name: 'telefone' }}
                                            onChange={(value) => setFieldValue('telefone', value)}
                                            data-testid="telefone"
                                        />
                                    </div>
                                    <br></br>
                                    <div>
                                        <label htmlFor="cpfCnpj">CPF ou CNPJ</label>
                                        <ErrorMessage name="cpfCnpj" component="div" data-testid="error" />
                                        <Field name="cpfCnpj" type="text" placeholder="CPF ou CNPJ" data-testid="cpfCnpj" />
                                    </div>
                                </div>
                                <div >
                                    <label htmlFor="cep">CEP</label>
                                    <ErrorMessage name="cep" component="div" data-testid="error" />
                                    <Field name='cep' type='text'
                                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                                            fetchAddress(event.target.value, setFieldValue)
                                        } placeholder="CEP" data-testid="cep" />
                                </div>
                                <div>
                                    <label htmlFor="rua">RUA</label>
                                    <Field name='rua' type='text' placeholder="Logradouro" data-testid="rua" />
                                </div>
                                <div>
                                    <div >
                                        <label htmlFor="numero">NÚMERO</label>
                                        <Field name='numero' type='text' placeholder="Número" data-testid="numero" />
                                    </div>
                                    <div >
                                        <label htmlFor="complemento">COMPLEMENTO</label>
                                        <Field name='complemento' type='text' placeholder="Complemento" data-testid="complemento" />
                                    </div>
                                    <div >
                                        <label htmlFor="bairro">BAIRRO</label>
                                        <Field name='bairro' type='text' placeholder="Bairro" data-testid="bairro" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="cidade">CIDADE</label>
                                        <Field name='cidade' type='text' placeholder="Cidade" data-testid="cidade" />
                                    </div>
                                    <div>
                                        <label htmlFor="uf">UF</label>
                                        <Field name='uf' type='text' placeholder="UF" data-testid="uf" />
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="col-75">
                                        <label htmlFor="ticket">
                                            <Field
                                                type="checkbox"
                                                name="ticket"
                                                checked={paymentMethod === 'ticket'}
                                                onChange={() => {
                                                    setPaymentMethod('ticket');
                                                    setIsCard(false);
                                                }}
                                                data-testid="ticket"
                                            />
                                            Pagamento em Boleto
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="card">
                                            <Field
                                                type="checkbox"
                                                name="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => {
                                                    setPaymentMethod('card');
                                                    setIsCard(true);
                                                }}
                                                data-testid="card"
                                            />
                                            Pagamento com Cartão
                                        </label>
                                    </div>
                                    {isCard && (
                                        <div>
                                            <div>
                                                <label htmlFor="cardNumber">Número do cartão</label>
                                                <ErrorMessage name="cardNumber" component="div" className="error" />
                                                <Field name='cardNumber' type='text' placeholder="Número do cartão" data-testid="cardNumber" />
                                            </div>
                                            <div>
                                                <label htmlFor="validity">Validade</label>
                                                <ErrorMessage name="validity" component="div" className="error" />
                                                <Field name='validity' type='text' placeholder="Validade" data-testid="validity" />
                                            </div>
                                            <div>
                                                <label htmlFor="printedName">Nome impresso no cartão</label>
                                                <ErrorMessage name="printedName" component="div" className="error" />
                                                <Field name='printedName' type='text' placeholder="Nome impresso no cartão" data-testid="printedName" />
                                            </div>
                                            <div>
                                                <label htmlFor="cvv">CVV</label>
                                                <ErrorMessage name="cvv" component="div" className="error" />
                                                <Field name='cvv' type='text' placeholder="CVV" data-testid="cvv" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button className='btn' type='submit' disabled={isSubmitting} >Salvar</button>
                            </Form>
                        )}
                    </Formik>
                </div>)
            }
        </div>
    );
}

export default Checkout;

