import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../feature/auth/state/authSlice'
import conversationSlice from '../feature/chat/state/AiSlice'


const store = configureStore(
    {
        reducer: {
            auth: authSlice,
            conversation: conversationSlice,
        }
    }
);

export default store