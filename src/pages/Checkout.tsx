import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import '../css/checkout.css';

function Checkout() {

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
        uf: ''
    }


    const handleSubmit = (values: CheckoutFormulários, { setSubmitting }: any) => {
        console.log(values);
        setSubmitting(false);
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
        <div className="row">
            <div className="col-75">
                <div className="container">
                    <h1>
                        Dados Pessoais
                    </h1>
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                    >
                        {({ isSubmitting, setFieldValue}) => (
                            <Form className="col-25">
                                <div>
                                    <div>
                                        <label htmlFor="name">NOME</label>
                                        <Field name='name' type='text' placeholder="Nome completo" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">EMAIL</label>
                                        <ErrorMessage name="email" component="div" className="error" />
                                        <Field name='email' type='text' placeholder="email@address.com" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="telefone">TELEFONE</label>
                                        <PhoneInput
                                            country={'br'}
                                            inputProps={{ name: 'telefone' }}
                                            onChange={(value) => setFieldValue('telefone', value)}
                                        />
                                    </div>
                                    <br></br>
                                    <div>
                                        <label htmlFor="cpfCnpj">CPF ou CNPJ</label>
                                        <ErrorMessage name="cpfCnpj" component="div" className="error" />
                                        <Field name="cpfCnpj" type="text" placeholder="CPF ou CNPJ" />
                                    </div>
                                </div>
                                <div >
                                    <label htmlFor="cep">CEP</label>
                                    <ErrorMessage name="cep" component="div" className="error" />
                                    <Field name='cep' type='text'
                                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                                            fetchAddress(event.target.value, setFieldValue)
                                        } placeholder="CEP" />
                                </div>
                                <div>
                                    <label htmlFor="rua">RUA</label>
                                    <Field name='rua' type='text' placeholder="Logradouro" />
                                </div>
                                <div>
                                    <div >
                                        <label htmlFor="numero">NÚMERO</label>
                                        <Field name='numero' type='text' placeholder="Número" />
                                    </div>
                                    <div >
                                        <label htmlFor="complemento">COMPLEMENTO</label>
                                        <Field name='complemento' type='text' placeholder="Complemento" />
                                    </div>
                                    <div >
                                        <label htmlFor="bairro">BAIRRO</label>
                                        <Field name='bairro' type='text' placeholder="Bairro" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="cidade">CIDADE</label>
                                        <Field name='cidade' type='text' placeholder="Cidade" />
                                    </div>
                                    <div>
                                        <label htmlFor="uf">UF</label>
                                        <Field name='uf' type='text' placeholder="UF" />
                                    </div>
                                </div>
                                <button className='btn' type='submit' disabled={isSubmitting}>Salvar</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    );
}

export default Checkout;

