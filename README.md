# Agentic AI

A full-stack AI chat application with account authentication, streamed assistant responses, and MongoDB-backed conversation storage.

## ✨ Features

### Completed Features

- Account registration and login with access-token authentication and refresh-token cookies.
- Create conversations, save user and assistant messages, and load existing conversations from the sidebar.
- Stream assistant output incrementally from the backend using Server-Sent Events (SSE).
- Render assistant messages as Markdown with GitHub Flavored Markdown support.
- Highlight fenced code blocks and copy their contents to the clipboard.
- Manage authentication and chat state with Redux Toolkit.

### In Progress

- Memory/context support: the chat request loads saved user memories and passes them to the model. Memory schema and service code, plus an extraction helper, exist, but normal chat does not extract or save new memories.

### Planned Features

- Connect memory extraction to a complete persistence workflow.
- Implement conversation search and deletion; the sidebar search field is currently presentational.
- Include prior conversation messages in model requests for multi-turn context.
- Connect the attachment, voice-input, and message feedback controls, which currently have no implemented actions.
- Apply authentication consistently to conversation and message read endpoints.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React Router, Axios
- **Backend:** Node.js, Express 5, TypeScript, `tsx`
- **AI / LLM:** LangChain `ChatOpenAI` integration using the Xkiro API endpoint and `mistralai/mistral-medium-3.5`
- **Database:** MongoDB with Mongoose
- **State Management:** Redux Toolkit and React Redux
- **Styling / UI:** Tailwind CSS 4, custom CSS, Lucide React icons
- **Other tools:** `react-markdown`, `remark-gfm`, `react-syntax-highlighter`, JWT, bcrypt, cookie-parser

## 📁 Project Structure

```text
.
├── package.json
├── package-lock.json
├── server.ts
├── tsconfig.json
├── .env.example
├── src/
│   ├── config/          # Environment and MongoDB setup
│   ├── controller/      # HTTP request handlers
│   ├── middleware/      # Authentication and error handling
│   ├── model/           # Mongoose models
│   ├── repository/      # Database operations
│   ├── routes/          # API route registration
│   ├── services/        # Authentication, chat, AI, and memory logic
│   ├── types/
│   └── utils/
└── client/
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── api/
        ├── app/         # Application setup and Redux store
        ├── feature/
        │   ├── auth/
        │   └── chat/
        ├── routes/
        └── utils/
```

## ⚙️ Installation

### Prerequisites

- Node.js and npm
- A MongoDB instance
- An API key for the configured Xkiro endpoint

1. Clone the repository:

   ```bash
   git clone https://github.com/aryanrajput9/Ai-chat.git
   cd Ai-chat
   ```

2. Install backend and frontend dependencies in separate directories:

   ```bash
   npm ci
   ```

   ```bash
   cd client
   npm ci
   ```

3. From the project root, copy `.env.example` to `.env` and fill in the required values. For example, in PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   Set `PORT=3000` for local development because the frontend currently targets the backend at `http://localhost:3000`.

4. Start the backend from the project root:

   ```bash
   npm run dev
   ```

5. Start the frontend in a second terminal:

   ```bash
   cd client
   npm run dev
   ```

Vite serves the frontend at `http://localhost:5173` by default. The backend health endpoint is available at `http://localhost:3000/health` when `PORT` is set to `3000`.

## 🔐 Environment Variables

The backend requires these names in the root `.env` file. `PORT` is optional in the backend configuration, but should be `3000` for the current frontend configuration.

| Name | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection URI |
| `ACCESSTOKEN` | Secret used to sign access tokens |
| `REFRESHTOKEN` | Secret used to sign refresh tokens |
| `NODE_ENV` | Runtime environment name |
| `XKIRO_API_KEY` | API key used by the model integration |
| `PORT` | Backend listening port; defaults to `5050` |

`.env.example` contains placeholders only. Do not commit `.env` or put real credentials in documentation.

## 🚀 Running the Project

- Backend development server: `npm run dev` from the project root (`tsx watch server.ts`).
- Frontend development server: `npm run dev` from `client/`.
- Frontend production build: `npm run build` from `client/`.
- Preview the built frontend: `npm run preview` from `client/`.
- Frontend lint: `npm run lint` from `client/`.

There is no backend build or production-start script defined in the current root `package.json`.

## 💬 AI Chat Features

The client submits the current user message and, when present, a conversation ID to `POST /api/v1/conversation`. The backend creates a conversation for a new chat or saves the message to an existing conversation, then requests a response from the configured LangChain model integration.

The backend streams generated text as SSE token events. The client reads those events and appends each token to the current assistant message. After generation, the backend saves the complete assistant response and sends a completion event containing the conversation ID.

Conversation messages are stored and can be loaded, but the current model request uses the latest prompt and saved memory context; it does not include the earlier messages from that conversation. Assistant output is rendered as Markdown, including GFM, syntax-highlighted code blocks, and a code-block copy action.

## 🧠 Memory / Context

Memory records are stored in MongoDB against a user ID. During chat requests, the backend retrieves that user's saved memories and supplies their content as background context to the model.

An AI memory-extraction helper and memory creation service/controller are present, but extraction is not called by the chat flow and the memory controller is not mounted in the API routes. Automatic long-term memory creation is therefore not currently available through the application.

## 💻 Code Rendering

Assistant messages use `react-markdown` with `remark-gfm`. Fenced code blocks are highlighted with `react-syntax-highlighter` using the Prism `oneDark` theme. Each code block has a copy button that writes its contents to the browser clipboard. The separate assistant-message copy and feedback icons are UI-only at present.

## 🔄 Conversation Management

The chat view creates a conversation on the first message, then routes to `/chat/:conversationId`. The `/conversations` view presents the conversation list, and selecting an item loads its stored messages. Starting a new chat clears the current messages and returns to `/conversations`.

Conversation search and deletion are not implemented. The API also exposes `GET /api/v1/conversation`, `GET /api/v1/conversation/:id`, and `GET /api/v1/message/allMessage/:conversationId` for retrieving conversation data.

## 🖼️ Screenshots

Screenshots have not been added yet.

## 🔮 Future Improvements

- Complete the memory extraction and save flow.
- Add conversation search and deletion.
- Send conversation history as model context for follow-up questions.
- Wire up the existing attachment, voice, message-copy, and feedback controls.
- Protect conversation and message read endpoints with authentication and user ownership checks.
- Make the backend URL configurable so it can differ from the current frontend's `localhost:3000` setting.

## 🤝 Contributing

Contributions are welcome. Open an issue to discuss a bug or proposed change, then submit a pull request with a clear description and relevant verification steps.

## 📄 License

ISC (declared in the root `package.json`).

## 👨‍💻 Author

Author information has not been specified in the project metadata.