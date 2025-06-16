# Teste Técnico - A Recreativa

## Visão Geral

Este projeto foi desenvolvido como parte do desafio técnico da Plataforma Studio MIA. O objetivo é solucionar um problema recorrente enfrentado por professores: a desorganização e a falta de padronização de planos de aula. Esta aplicação possibilita ao professor organizar, visualizar e padronizar seus documentos de forma simples e eficiente.

---

## Funcionalidades

- **Upload de arquivos:** Permite o envio de documentos nos formatos `.pdf` e `.docx`.
- **Visualização de preview:** Exibe um visualizador integrado para o documento enviado, facilitando a conferência do conteúdo sem sair da plataforma.
- **Formulário estruturado:** Disponibiliza campos organizados para preenchimento dos dados do plano de aula, tornando o fluxo prático e padronizado.
- **Geração de PDF padronizado:** Com base nas informações do formulário, gera automaticamente um novo PDF, moderno e unificado, pronto para ser reutilizado.
- **Arquivamento do documento original:** O arquivo enviado permanece salvo no sistema, permitindo consulta futura e garantindo referência ao material original.

---

## Exemplo Visual

Abaixo estão exemplos de uso do sistema, ilustrando o fluxo completo:

- As duas primeiras imagens mostram exemplos de documentos enviados: um arquivo `.docx` e um arquivo `.pdf`, ambos visualizados diretamente na plataforma.

![Visualização de um documento DOCX enviado](/public/docs.png)
![Visualização de um documento PDF enviado](/public/pdf.png)

- As duas imagens seguintes demonstram o formulário antes do upload (campos vazios) e após o envio do documento, com preenchimento automático dos campos a partir do conteúdo extraído.

![Formulário antes do envio do documento](/public/img1.png)
![Formulário após envio do documento, com campos preenchidos automaticamente](/public/img2.png)

- Por fim, após salvar o plano de aula, você é redirecionado para uma listagem onde pode baixar o PDF padronizado gerado, além de consultar o documento original arquivado.

![Listagem de planos de aula, com opções para download e consulta do documento original](/public/img3.png)

---

## Instalação e Execução

Siga os passos abaixo para rodar a aplicação localmente:

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:breno-aredes/teste-a-recreativa-frontend.git
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

   - Crie um arquivo `.env` na raiz do projeto front-end com as configurações necessárias para apontar para o back-end, use `.env.example` como referência.

5. **Clone e execute o back-end:**

   - O repositório do back-end pode ser encontrado em: [breno-aredes/teste-a-recreativa-backend](https://github.com/breno-aredes/teste-a-recreativa-backend)
   - Siga as instruções do README do back-end para configurar e iniciar o servidor.

6. **Inicie o servidor de desenvolvimento do front-end:**

   ```bash
   npm run dev
   ```

---

> **Observação:**  
> Certifique-se de que o servidor do back-end está rodando e que a variável de ambiente do front-end está corretamente configurada para se comunicar com ele antes de iniciar o front-end.

## Tecnologias Utilizadas

- **TypeScript:** Linguagem principal do projeto.
- **Next.js:** Framework React.
- **React:** Biblioteca base para construção da interface.
- **Ant Design:** Biblioteca de componentes UI moderna e responsiva.
- **Axios:** Cliente HTTP para integração com APIs.
- **docx-preview:** Visualização de arquivos `.docx` diretamente no navegador.
- **jspdf:** Geração de arquivos PDF a partir dos dados do formulário.
- **React Icons:** Biblioteca de ícones para React (icones extras).

---

## Observações

- O sistema aceita apenas arquivos `.pdf` ou `.docx` no upload.
- O template do PDF gerado pode ser facilmente customizado no código.

---
