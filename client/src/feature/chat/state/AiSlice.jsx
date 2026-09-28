import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversations: [],
    currentConversation: null,
    currentConversationId: null,
    messages: [],
    isLoading: false,
    error: null,
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,

    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload;
        },

        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },

        setCurrentConversationId: (state, action) => {
            state.currentConversationId = action.payload;
        },

        setMessages: (state, action) => {
            state.messages = action.payload;
        },

        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },

        // 🔥 Streaming start
        startAssistantMessage: (state) => {
            state.messages.push({
                role: "assistant",
                content: "",
                isStreaming: true,
            });
        },

        // 🔥 Har token ko existing AI message me add karega
        appendAssistantToken: (state, action) => {
            const lastMessage =
                state.messages[state.messages.length - 1];

            if (
                lastMessage &&
                lastMessage.role === "assistant" &&
                lastMessage.isStreaming
            ) {
                lastMessage.content += action.payload;
            }
        },

        // 🔥 Streaming complete
        finishAssistantMessage: (state) => {
            const lastMessage =
                state.messages[state.messages.length - 1];

            if (
                lastMessage &&
                lastMessage.role === "assistant"
            ) {
                lastMessage.isStreaming = false;
            }
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        clearCurrentConversation: (state) => {
            state.messages = [];
            state.error = null;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const selectConversations = (state) =>
    state.conversation.conversations;

export const selectCurrentConversation = (state) =>
    state.conversation.currentConversation;

export const selectCurrentConversationId = (state) =>
    state.conversation.currentConversationId;

export const selectMessages = (state) =>
    state.conversation.messages;

export const selectConversationLoading = (state) =>
    state.conversation.isLoading;

export const selectConversationError = (state) =>
    state.conversation.error;

export const {
    setConversations,
    setCurrentConversation,
    setCurrentConversationId,
    setMessages,
    addMessage,
    startAssistantMessage,
    appendAssistantToken,
    finishAssistantMessage,
    setLoading,
    setError,
    clearCurrentConversation,
    clearError,
} = conversationSlice.actions;

export default conversationSlice.reducer;