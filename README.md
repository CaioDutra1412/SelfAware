# SelfAware 🧠✨

*Uma jornada de autoconhecimento e bem-estar emocional na palma da sua mão.*

---

## 📜 Sobre o Projeto

O **SelfAware** é um aplicativo mobile desenvolvido com React Native e Expo, projetado para ajudar os usuários a identificar e refletir sobre possíveis padrões de dependência emocional. Através de testes interativos e feedbacks personalizados gerados por IA, o aplicativo oferece uma ferramenta de autoavaliação para diversas áreas da vida, como relacionamentos, trabalho, amizades e família.

O objetivo principal é promover a autonomia emocional, o autoconhecimento e fornecer um primeiro passo seguro e confidencial para quem busca entender melhor seus sentimentos e comportamentos.

---

## 📱 Telas do Aplicativo

Aqui estão algumas das principais telas que compõem a experiência do usuário no SelfAware.

Dentro da pasta do projeto!

---

## ✨ Principais Funcionalidades

-   **Autenticação Completa:** Cadastro, login e recuperação de senha utilizando Firebase Authentication.
-   **Testes Interativos:** Questionários em formato de chat para avaliar níveis de dependência emocional em diferentes contextos.
-   **Feedback com IA:** Respostas e análises personalizadas geradas pela API do Google Gemini.
-   **Dashboard de Progresso:** Visualize o histórico de testes, pontuações e a média geral de evolução.
-   **Perfil de Usuário:** Edição de informações pessoais, como nome, data de nascimento e foto de perfil, com upload para o Firebase Storage.
-   **Formulário de Ajuda:** Envio de dúvidas diretamente para o e-mail do suporte através do EmailJS.
-   **Navegação Intuitiva:** Menu lateral (Drawer) para fácil acesso a todas as seções do app.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

-   **Framework:** React Native (com Expo)
-   **Navegação:** React Navigation (Stack, Drawer)
-   **Backend & Banco de Dados:** Firebase (Authentication, Firestore, Storage)
-   **Inteligência Artificial:** Google Gemini API
-   **Serviço de E-mail:** EmailJS
-   **UI & Componentes:**
    -   `@expo/vector-icons`
    -   `expo-linear-gradient`
    -   `react-native-toast-notifications`

---

## ⚙️ Como Executar o Projeto

Para executar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
-   `npm` ou `yarn`
-   Aplicativo [Expo Go](https://expo.dev/go) instalado no seu celular

### Instalação

1.  **Clone o repositório:**
    ```
    git clone https://github.com/seu-usuario/selfawarev2.git
    ```

2.  **Acesse a pasta do projeto:**
    ```
    cd selfawarev2
    ```

3.  **Instale as dependências:**
    ```
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione suas chaves de API do Firebase e EmailJS. Use o arquivo `.env.example` como modelo.
    ```
    # Firebase
    EXPO_PUBLIC_FIREBASE_API_KEY=SUA_CHAVE_AQUI
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=SEU_DOMINIO_AQUI
    EXPO_PUBLIC_FIREBASE_PROJECT_ID=SEU_ID_AQUI
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=SEU_BUCKET_AQUI
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=SEU_ID_AQUI
    EXPO_PUBLIC_FIREBASE_APP_ID=SEU_ID_AQUI

    # Google Gemini
    EXPO_PUBLIC_GEMINI_API_KEY=SUA_CHAVE_AQUI

    # EmailJS
    EXPO_PUBLIC_EMAILJS_SERVICE_ID=SEU_ID_AQUI
    EXPO_PUBLIC_EMAILJS_TEMPLATE_ID=SEU_ID_AQUI
    EXPO_PUBLIC_EMAILJS_PUBLIC_KEY=SEU_ID_AQUI
    ```

5.  **Inicie o projeto:**
    ```
    npx expo start
    ```

6.  **Abra no seu celular:**
    Escaneie o QR code que aparecerá no terminal com o aplicativo Expo Go.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Contato

Feito por **Caio Ottoni**

-   **E-mail:** ottonidev@gmail.com
-   **GitHub:** [@seu-github](https://github.com/seu-github)
-   **LinkedIn:** [/seu-linkedin](https://linkedin.com/in/seu-linkedin)

