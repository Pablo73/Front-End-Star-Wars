import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import './checkout.css';

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
            if(!value) return true;

            if(cpf.isValid(value) || cnpj.isValid(value)){
                return true;
            }
            return false;
        }).required('Campo Obrigatório'),
        telefone: Yup.string().required('Campo Obrigatório'),
        name: Yup.string().required('Campo Obrigatório'),
        cep: Yup.string()
            .matches(/^\d{5}-\d{3}$/, 'CEP inválido. Formato esperado: 12345-678')
            .required('Campo Obrigatório'),
        rua: Yup.string().required('Campo Obrigatório'),
        numero: Yup.number().required('Campo Obrigatório'),
        cidade: Yup.string().required('Campo Obrigatório'),
        bairro: Yup.string().required('Campo Obrigatório'),
        uf: Yup.string().required('Campo Obrigatório')
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
                    Check-Out
                </h1>
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div>
                                <div>
                                    <label>NOME</label>
                                    <Field name='name' type='text' placeholder="Nome completo"/>
                                    <ErrorMessage name="name" component="div" className="error" />
                                </div>
                                <div >
                                    <label>EMAIL</label>
                                    <Field className="inputbox" name='email' type='text' placeholder="email@address.com"/>
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                            </div>
                            <div className="name">
                                <div>
                                    <label>TELEFONE</label>
                                    <PhoneInput
                                        country={'br'}
                                        inputClass="inputbox"
                                        inputProps={{
                                            name: 'telefone',
                                            required: true
                                        }} 
                                    />
                                    <ErrorMessage name="telefone" component="div" className="error" />
                                </div>
                                <div>
                                    <label>CPF ou CNPJ</label>
                                    <Field className="inputbox" name="cpfCnpj" type="text" placeholder="CPF ou CNPJ"/>
                                    <ErrorMessage name="cpfCnpj" component="div" className="error" />
                                </div>
                            </div>
                            <div >
                                <label>CEP</label>
                                <Field className="inputbox" name='cep' type='text'
                                    onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                                        fetchAddress(event.target.value, setFieldValue)
                                    } placeholder="CEP"/>
                                <ErrorMessage name="cep" component="div" className="error" />
                            </div>
                            <div>
                                <label>RUA</label>
                                <Field className="inputbox" name='rua' type='text' placeholder="Logradouro"/>
                                <ErrorMessage name="rua" component="div" className="error"/>
                            </div>
                            <div>
                                <div >
                                    <label>NÚMERO</label>
                                    <Field className="inputbox" name='numero' type='text' placeholder="Número"/>
                                    <ErrorMessage name="numero" component="div" className="error" />
                                </div>
                                <div >
                                    <label>COMPLEMENTO</label>
                                    <Field className="inputbox" name='complemento' type='text' placeholder="Complemento"/>
                                    <ErrorMessage name="complemento" component="div" className="error" />
                                </div>
                                <div >
                                    <label>BAIRRO</label>
                                    <Field className="inputbox" name='bairro' type='text' placeholder="Bairro"/>
                                    <ErrorMessage name="bairro" component="div" className="error"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-50">
                                    <label>CIDADE</label>
                                    <Field className="inputbox" name='cidade' type='text' placeholder="Cidade"/>
                                    <ErrorMessage name="cidade" component="div" className="error"/>
                                </div>
                                <div className="col-50">
                                    <label>UF</label>
                                    <Field className="inputbox" name='uf' type='text' placeholder="UF"/>
                                    <ErrorMessage name="uf" component="div" className="error" />
                                </div>
                            </div>
                            <button type='submit' disabled={isSubmitting}>Salvar</button>
                        </Form>
                    )}
                </Formik>
            </div>
            </div>
        </div >
    );
}

export default Checkout;

