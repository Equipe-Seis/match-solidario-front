
# Match Solidário App

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

*   **[Ionic Framework](https://ionicframework.com/):** Biblioteca de componentes de UI para criar aplicativos de alta qualidade com tecnologias web.
*   **[Vue.js](https://vuejs.org/):** Framework JavaScript progressivo para a construção da interface do usuário.
*   **[Capacitor](https://capacitorjs.com/):** Ferramenta para transformar o código web em um aplicativo nativo para Android e iOS, permitindo acesso a recursos nativos do dispositivo.
*   **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript que adiciona tipagem estática ao código.
*   **[SASS/SCSS](https://sass-lang.com/):** Pré-processador CSS para estilos mais organizados.

## 📋 Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

1.  **[Node.js](https://nodejs.org/en/) (versão LTS recomendada):** Ambiente de execução para JavaScript.
2.  **[Git](https://git-scm.com/):** Sistema de controle de versão.
3.  **[Android Studio](https://developer.android.com/studio):** IDE oficial para desenvolvimento Android, necessária para o SDK, ferramentas de build (Gradle) e o emulador.
4.  **VS Code (Recomendado):** Editor de código para editar o projeto web.

## ⚙️ Guia de Instalação e Execução


### 1. Clonar o Repositório

Abra seu terminal (Git Bash, PowerShell, etc.) e clone o projeto para sua máquina local:

```bash
git clone <URL_DO_SEU_REPOSITORIO_GIT>
cd match-solidario
```

### 2. Instalar as Dependências do Projeto

```bash
npm install
```

### 3. Sincronizar a Plataforma Android

Este comando cria a pasta `android` (se não existir) e copia os arquivos do projeto web para dentro do projeto nativo.

```bash
ionic cap sync android
```

### 4. Abrir o Projeto no Android Studio

1.  Abra o **Android Studio**.
2.  Na tela de boas-vindas, clique em **"Open"**.
3.  Navegue até a pasta onde você clonou o projeto e **selecione a subpasta `android`**.
4.  Clique em **"OK"**.
5.  Aguarde o Android Studio sincronizar o projeto (o "Gradle Sync").

### 5. Executar no Emulador

1.  Dentro do Android Studio, crie um dispositivo virtual (emulador) através do **Device Manager** (ícone de celular na barra de ferramentas).
2.  Selecione o emulador criado na barra de ferramentas superior.
3.  Clique no botão de **Play (▶️ Run 'app')** para construir e instalar o aplicativo no emulador.

O aplicativo "Match Solidário" será iniciado automaticamente no emulador.

## 🔄 Fluxo de Trabalho para Desenvolvimento

Para fazer alterações no código e vê-las no emulador, siga este fluxo:

1.  **Edite o código-fonte** na pasta `src/` usando o **VS Code**.
2.  No terminal do VS Code, rode o comando de sincronização para atualizar o projeto nativo:
    ```bash
    ionic cap sync android
    ```
3.  No **Android Studio**, clique no botão de **Play (▶️)** novamente para instalar a nova versão no emulador.

## 📂 Estrutura de Pastas

*   **/src**: Contém todo o código-fonte do aplicativo Vue.js (páginas, componentes, rotas).
*   **/public**: Contém arquivos estáticos, como o `index.html` e o `favicon.png`.
*   **/android**: Contém o projeto nativo do Android gerado pelo Capacitor. **Esta é a pasta que deve ser aberta no Android Studio.**
*   **/resources**: Contém os recursos do aplicativo, como o ícone e a tela de splash.
*   **capacitor.config.ts**: Arquivo de configuração principal do Capacitor.
*   **ionic.config.json**: Arquivo de configuração do Ionic.
