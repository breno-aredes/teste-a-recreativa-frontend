# Teste Técnico - A Recreativa (Front-end)

## Visão Geral

Este repositório contém o front-end do desafio técnico da Plataforma Studio MIA. O objetivo principal é permitir que professores organizem, visualizem e padronizem seus planos de aula, solucionando a desorganização e a falta de padronização desses documentos. O sistema possibilita o upload de arquivos `.pdf` e `.docx`, extração automática de campos, preenchimento de formulários, geração de PDF padronizado e consulta de documentos.

---

## Funcionalidades

- **Upload de arquivos** (`.pdf` e `.docx`): Permite o envio de documentos de planos de aula.
- **Visualização de preview**: Exibe um visualizador integrado para o documento enviado, facilitando a conferência do conteúdo.
- **Formulário estruturado**: Disponibiliza campos organizados para preenchimento dos dados do plano.
- **Preenchimento automático**: Realiza a extração automática dos campos do documento enviado, agilizando o cadastro.
- **Geração de PDF padronizado**: Cria automaticamente um novo PDF moderno e padronizado com base nos dados do formulário.
- **Listagem e consulta**: Exibe todos os planos cadastrados, com opção de download do PDF gerado e consulta do documento original.

---

## Exemplo Visual

Abaixo estão exemplos do funcionamento do sistema:

- As duas primeiras imagens mostram exemplos de documentos enviados: um arquivo `.docx` e um `.pdf`, ambos visualizados dentro da plataforma.

![Visualização de um documento DOCX enviado](/public/docs.png)
![Visualização de um documento PDF enviado](/public/pdf.png)

- As imagens seguintes demonstram o formulário antes do upload (campos vazios) e após o envio do documento, com preenchimento automático dos campos extraídos.

![Formulário antes do envio do documento](/public/img1.png)
![Formulário após envio do documento, com campos preenchidos automaticamente](/public/img2.png)

- Por fim, após salvar o plano de aula, você é redirecionado para uma listagem onde pode baixar o PDF padronizado gerado e consultar o documento original.

![Listagem de planos de aula, com opções para download e consulta do documento original](/public/img3.png)

---

## Instalação e Execução

Siga os passos abaixo para rodar o front-end localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/breno-aredes/teste-a-recreativa-frontend.git
   ```

2. **Acesse o diretório do projeto:**

   ```bash
   cd teste-a-recreativa-frontend
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env` na raiz do projeto.
   - Use o arquivo `.env.example` como referência.

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   O front-end ficará disponível por padrão em `http://localhost:3000`.

---

## Integração com o Back-end

O back-end correspondente está disponível em:  
[breno-aredes/teste-a-recreativa-backend](https://github.com/breno-aredes/teste-a-recreativa-backend)

> **Importante:**  
> Consulte o README do back-end para detalhes sobre configuração do `.env`.

> **Observação:**  
> Certifique-se de que o servidor do back-end está rodando e que a variável de ambiente do front-end está corretamente configurada para se comunicar com ele antes de iniciar o front-end.

---

## Tecnologias Utilizadas

- **TypeScript:** Linguagem principal do projeto.
- **Next.js:** Framework React.
- **React:** Biblioteca base para construção da interface.
- **Ant Design:** Biblioteca de componentes UI moderna e responsiva.
- **Axios:** Cliente HTTP para integração com APIs.
- **docx-preview:** Visualização de arquivos `.docx` diretamente no navegador.
- **jspdf:** Geração de arquivos PDF a partir dos dados do formulário.
- **React Icons:** Biblioteca de ícones para React.

---

## Observações

- O sistema aceita apenas arquivos `.pdf` ou `.docx` no upload.
- O template do PDF gerado pode ser facilmente customizado no código.
- Certifique-se de que todas as dependências do front-end estejam instaladas e que o arquivo `.env` esteja corretamente configurado.

---
