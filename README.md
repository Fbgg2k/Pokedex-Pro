# Pokedex Pro (Firebase Studio Project)

## Instalação e Execução

Siga os passos abaixo para instalar as dependências e rodar o Pokedex Pro localmente:

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/Pokedex-Pro.git
cd Pokedex-Pro
```

### 2. Instale as dependências

Com npm:

```bash
npm install
```

Ou com yarn:

```bash
yarn install
```

### 3. Configure variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto, se necessário, e adicione as variáveis exigidas (consulte `.env.example` se disponível).

### 4. Rode o servidor de desenvolvimento

Com npm:

```bash
npm run dev
```

Ou com yarn:

```bash
yarn dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

### 5. Build para produção (opcional)

Para gerar uma build de produção:

```bash
npm run build
npm start
```

Ou com yarn:

```bash
yarn build
yarn start
```

---

Se encontrar problemas, consulte a documentação do Next.js ou abra uma issue neste repositório.

This project is a modern Pokedex application built with Next.js and React, designed to provide a seamless user experience for exploring Pokémon data.
Our approach leverages Next.js App Router for optimized routing and Server Components for improved performance.
We utilize TypeScript for type safety and maintainability throughout the codebase.
Styling is achieved using Tailwind CSS for rapid UI development, complemented by ShadCN UI for pre-built, customizable components and a consistent theming system.
Client-side state, such as managing favorite Pokémon, is handled efficiently with Zustand.
Data is fetched asynchronously from the PokeAPI using native `fetch`.
The coding style emphasizes functional components, React Hooks, clear naming conventions, and modular component design for reusability.
We prioritize creating responsive, accessible, and aesthetically pleasing interfaces.
Error handling is implemented at both page and component levels to ensure a robust application.