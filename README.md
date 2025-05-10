# 🎥 Catálogo de Filmes do Studio Ghibli

Este projeto é um catálogo interativo para listar e avaliar os filmes do Studio Ghibli. Além de visualizar informações completas dos filmes, o usuário pode marcar favoritos, assistidos, adicionar anotações e avaliações pessoais, além de aplicar filtros e ordenações dinâmicas.

---

## 🚀 Instalação e Execução

```bash
git clone https://github.com/Mr99880371/StudioGhibliGallery.git
cd StudioGhibliGallery

# Instalar dependências
npm install

# Iniciar servidor local
npm start
```

> Acesse em `http://localhost:3000`

---

## 🛠️ Stack Utilizada

- ⚛️ **React**
- 💙 **TypeScript**
- 🧠 **Redux** (gerenciamento global de estado)
- 🌬 **Tailwind CSS**
- 🔁 **Axios** (requisições HTTP)
- 🧪 **Jest** (testes unitários)
- 🌐 **API Restful**

---

## ✅ Funcionalidades Implementadas

### ✅ Obrigatórias

- 📌 Listar filmes com:
  - 🎞 Imagem
  - 🎬 Título
  - 🗓 Ano de lançamento
  - ⏱ Duração
  - 📝 Sinopse
  - 👤 Diretor e Produtor
  - ⭐ Nota de avaliação (`rt_score`)
- ✅ Marcar filme como **assistido**
- ❤️ Marcar filme como **favorito**
- 🔎 Filtrar filmes por **título**
- 📚 Buscar palavras na **sinopse** (com destaque visual)
- 📝 Adicionar **anotações**
- 🌟 Avaliação pessoal (1 a 5 estrelas)
- 🧮 Filtros adicionais:
  - Assistido / Favorito / Com anotação / Estrelas
- 🔃 Ordenações dinâmicas:
  - Título, Duração, Avaliação pessoal, Nota `rt_score`

### ✨ Desejáveis

- ✅ Utilizar **TypeScript**
- 📱 Responsividade básica
- 🔔 Mensagens toast para ações:
  - Marcar/desmarcar como assistido/favorito
  - Adicionar/editar/remover anotações
- 🧪 Teste unitário (ex: botão de favorito)
- 📦 Separação de responsabilidades (componentes, serviços)
- 🧰 Estilização com **Tailwind**
- 🌐 Estado global com **Redux**
- 🔄 Axios para controle assíncrono

---

## 🧪 Testes com Jest

Este projeto utiliza **Jest** para testes unitários.

### Executar testes:

```bash
npm test
```

> Os testes estão organizados próximos aos componentes (`*.test.tsx`) ou em `/__tests__/`

---

## 📂 Estrutura de Pastas

```bash
src/
├── __tests__/      # Testes unitários
├── assets/         # Imagens e arquivos estáticos     
├── components/     # Componentes reutilizáveis        
├── pages/          # Páginas principais
├── services/       # APIs e chamadas HTTP
├── store/          # Redux: slices e configurações
├── styles/         # Estilos e Tailwind config
└── types.ts        # Definições TypeScript
```

---

## 🌸 Sobre o Studio Ghibli

Este projeto consome dados da [API pública do Studio Ghibli](https://ghibliapi.vercel.app/), com o intuito de prestar homenagem aos filmes e proporcionar uma experiência enriquecedora de organização, avaliação e admiração por suas obras.

---

## 🧑‍🎓 Developed by

Mariane A Justino

GitHub: https://github.com/Mr99880371

LinkedIn: https://www.linkedin.com/in/marianearaujodeveloper
