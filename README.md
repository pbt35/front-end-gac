# Sistema de Gerenciamento de Transações

Este projeto é uma aplicação desenvolvida em **React** com **Next.js**, que permite visualizar e interagir com transações financeiras, incluindo funcionalidades para reverter transações.

A aplicação utiliza o framework **Next.js** para a renderização e roteamento da interface, com **Ant Design** para a interface de usuário e **Jest** para testes.

## Funcionalidades

- Exibição de transações financeiras do tipo **DEPOSIT** (Depósito Realizado) e **TRANSFER** (Transferência).
- Reversão de transações com feedback visual (mensagem de reversão em andamento).
- Exibição de detalhes da transação, como data, status e usuário destinatário (para transferências).
- Testes integrados para garantir a estabilidade da aplicação.

## Tecnologias Usadas

- **React**: Biblioteca principal para construção da interface.
- **Next.js**: Framework para renderização do lado do servidor e roteamento.
- **Ant Design**: Biblioteca de componentes UI para a construção da interface.
- **Jest & Testing Library**: Para testes unitários e de integração.
- **TypeScript**: Para maior segurança de tipos e escalabilidade.

## Requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- **Node.js** (versão 16 ou superior)
- **Yarn**, **npm**, **pnpm** ou **bun** (gerenciadores de pacotes)
- **Git** (para controle de versão)
- Editor de código, como **Visual Studio Code** (com extensões de **TypeScript** e **ESLint**)

## Instalação

### 1. Clonando o Repositório

Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/pbt35/front-end-gac.git
cd front-end-gac
```

### 2. Instalando dependências

```
yarn install
npm install
```

### 3. Variáveis de Ambiente
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="minha-chave-secreta"
```

### 4. Inicializando o Servidor

```
ỳarn dev
npm run dev
```

### 5. Estrutura do Projeto

```
/src
  /components                # Componentes React
    /ListItem                # Componente para exibir transações
  /contexts                  # Contextos React para gerenciamento de estado
  /hooks                     # Hooks personalizados
  /utils                     # Funções utilitárias
  /tests                     # Testes unitários e de integração
  /pages                     # Páginas do Next.js
  /assets                    # Arquivos estáticos como imagens
  /styles                    # Arquivos de estilo (CSS, SCSS)
  index.tsx                  # Ponto de entrada do React
  App.tsx                    # Componente raiz do React
```

### 6. Docker 
Utilizando o Docker Compose:

Como no projeto já existe o arquivo ```docker-compose.yml```, basta rodar o comando abaixo: 

```
docker-compose up
```

### 7. Licença

Este projeto está licenciado sob a MIT License







