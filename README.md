# Consumir a API de Star Wars

Este projeto consiste em uma aplicação web que consome a API de Star Wars (https://swapi.dev/about) para listar os veículos disponíveis. Os usuários podem adquirir um dos veículos listados através de um processo de checkout.

## Deploy

O projeto está implantado e disponível em: 

## Funcionalidades

- [x] Listar os veículos da API de Star Wars conforme a documentação.
- [x] Permitir a aquisição de um veículo selecionado através do checkout.
- [x] Exigir informações pessoais, informações de endereço e informações de pagamento no checkout.
- [x] Utilizar a API ViaCEP para obter automaticamente os dados de endereço com base no CEP informado pelo cliente.
- [x] Realizar validação nos formulários do checkout, incluindo e-mail e CPF/CNPJ.
- [X] Exibir uma tela de sucesso após a compra ou um toast de erro em caso de dados inválidos.
- [X] Todos os dados utilizados serão mockados.

## Tecnologias utilizadas

- **ReactJS**: [REACT](https://pt-br.legacy.reactjs.org/) construção da interfaces de usuário.
- **MobX**: [Mobx](https://mobx.js.org/react-integration.html) gerenciamento de estado.
- **TypeScript**: [TypeScript](https://www.typescriptlang.org/) linguagem de programação que adiciona tipagem estática ao JavaScript.
- **Formik**: [Formik](https://formik.org/) biblioteca para gerenciamento de formulários em React.
- **Yup**: [Yup](https://github.com/jquense/yup) biblioteca de validação de esquemas para JavaScript e TypeScript.

## Pré-requisitos 

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (https://nodejs.org)
- npm (gerenciador de pacotes do Node.js)

## Como executar o projeto

1. Clone este repositório em sua máquina local:

```ruby
git clone <URL do repositório>
```

2. Acesse o diretório do projeto:

```ruby
cd Front-End-Star-Wars
```

3. Instale as dependências do projeto:

```ruby
npm install
```

4. Execute o projeto:

```ruby
npm start
```
