---

## 📦 Pokedex Pro

**Pokedex Pro** é uma aplicação moderna construída com **Next.js** e **React**, desenvolvida para oferecer uma experiência fluida e intuitiva na exploração de dados de Pokémon.

### 🚀 Tecnologias e Arquitetura

* **Next.js App Router**: utilizado para navegação otimizada com suporte a Server Components, melhorando o desempenho da aplicação.
* **TypeScript**: adotado em todo o projeto para garantir segurança de tipos, clareza e facilidade de manutenção.
* **Tailwind CSS**: utilizado para estilização rápida e responsiva da interface.
* **ShadCN UI**: fornece componentes reutilizáveis e personalizáveis com sistema de temas consistente.
* **Zustand**: gerencia eficientemente o estado no cliente, como favoritos e filtros.
* **PokeAPI**: os dados são obtidos de forma assíncrona via `fetch`, garantindo leveza e simplicidade no consumo da API.

### ⚙️ Padrões de Código

* Componentes funcionais e React Hooks.
* Nomenclatura clara e consistente.
* Design modular, com foco em reutilização e escalabilidade.
* Manipulação de erros implementada tanto em nível de página quanto de componente.

### 💡 Foco no Usuário

A aplicação é responsiva, acessível e visualmente agradável, garantindo uma boa experiência em diferentes dispositivos.

---

# Pokedex Pro

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
