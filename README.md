# Discord Roll Bot

Um bot de Discord para rolagem de dados. Desenvolvido em TypeScript, utilizando as bibliotecas [discord.js](https://discord.js.org/) e [Bun](https://bun.sh/)

## Bot Experimental
Este bot é experimental e com poucos recursos. Ele serve como um exemplo de como criar um bot de Discord para rolagem de dados, utilizando a biblioteca `discord.js` e a base [Constatic](https://constatic-docs.vercel.app).

## Base do bot
Este bot é construído sobre a base [Constatic](https://constatic-docs.vercel.app)
que fornece uma estrutura sólida e extensível para bots do Discord, facilitando a adição de novos comandos e eventos.

## Funcionalidades

- Comando `/roll` para rolar dados com sintaxe flexível (ex: `2d6+1`).
- Evento para rolar dados simplesmente ditando no chat (ex: `2d6+1`).
- Comando `/ping` para checar a resposta do bot. Já vem por padrão na base [Constatic](https://constatic-docs.vercel.app).

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/discord-roll-bot.git
   cd discord-roll-bot
   ```

2. Instale as dependências:
   ```sh
   bun install
   # ou
   npm install
   ```

3. Configure o arquivo `.env` com seu token do Discord e outras variáveis necessárias.

## Uso

- Para desenvolvimento (hot reload):
  ```sh
  bun run dev
  ```

- Para build e produção:
  ```sh
  bun run build
  bun run start
  ```

- Para rodar com Node.js (após build):
  ```sh
  npm run node:start
  ```

## Scripts Disponíveis

- `dev`: Executa o bot em modo desenvolvimento com hot reload.
- `build`: Compila o projeto para produção.
- `start`: Inicia o bot (Bun).
- `node:start`: Inicia o bot usando Node.js.
- `test`: Executa os testes com Vitest.
- `lint` e `format`: Analisa e corrige problemas de lint.

## Estrutura do Projeto

```
src/
  discord/       # Arquivos específicos do Discord
    base/        # Base Constatic
    commands/    # Comandos do bot
    events/      # Eventos do bot
  functions/     # Funções utilitárias (ex: dice-evaluator)
  settings/      # Configurações e validações (Geradas pela base Constatic)
tests/           # Testes unitários
```
