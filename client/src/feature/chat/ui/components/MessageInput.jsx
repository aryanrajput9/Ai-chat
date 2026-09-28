
import {
    Paperclip,
    Mic,
    ArrowUp,
    Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../auth/state/authSlice";
import { addMessage, appendAssistantToken, finishAssistantMessage, selectCurrentConversationId, setConversations, setCurrentConversationId, startAssistantMessage, } from "../../state/AiSlice";
import { chatService } from "../../services/aiServices";
import { useNavigate } from "react-router-dom";
import useAiHook from "../../hook/aiHook";

function MessageInput() {


    const { id } = useSelector(selectUser);
    const currentConversationsId = useSelector(selectCurrentConversationId)
    const dispatch = useDispatch()


    const navigate = useNavigate()

    const { getConversationHook } = useAiHook()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const content = formData.get("message")?.trim();

        if (!content) return;

        const title = content.slice(0, 50);

        try {
            const conversationId = currentConversationsId || null;

            // =========================
            // USER MESSAGE
            // =========================

            dispatch(
                addMessage({
                    role: "user",
                    content,
                })
            );

            // =========================
            // EMPTY AI MESSAGE
            // =========================

            dispatch(startAssistantMessage());

            // =========================
            // STREAM AI RESPONSE
            // =========================

            const response = await chatService(
                {
                    content,
                    title,
                    user: id,
                    conversationId,
                },

                // Har AI token yahan aayega
                (token) => {
                    dispatch(
                        appendAssistantToken(token)
                    );
                }
            );


            // =========================
            // STREAM COMPLETE
            // =========================

            dispatch(finishAssistantMessage());

            // =========================
            // NEW CONVERSATION
            // =========================

            const newConversationId =
                response?.conversationId;

            if (!currentConversationsId && newConversationId) {

                dispatch(
                    setCurrentConversationId(
                        newConversationId
                    )
                );

                navigate(
                    `/chat/${newConversationId}`
                );
            }

            const conversations = await getConversationHook();

            dispatch(setConversations(conversations))



            e.target.reset();

        } catch (error) {

            console.error("Chat error:", error);

            dispatch(finishAssistantMessage());
        }
    };

    return (
        <div className="px-5 pb-5 pt-3 bg-[#090B09]">
            <form
                onSubmit={handleSubmit}
                className="px-5 pb-5 pt-3 bg-[#090B09]"
            >
                <div className="max-w-4xl mx-auto">

                    {/* Input Box */}
                    <div className="relative flex items-end gap-2 p-2 rounded-2xl bg-[#121512] border border-white/[0.08] focus-within:border-[#9ACF75]/30 transition">

                        {/* Attachment */}
                        <button
                            type="button"
                            className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white/30 hover:text-[#9ACF75] hover:bg-[#9ACF75]/10 transition"
                        >
                            <Paperclip size={18} />
                        </button>

                        {/* Textarea */}
                        <textarea
                            name="message"
                            rows={1}
                            placeholder="Message your AI..."
                            className="flex-1 min-h-[40px] max-h-32 py-2.5 bg-transparent outline-none resize-none text-sm text-white placeholder:text-white/25"
                        />

                        {/* Right Actions */}
                        <div className="flex items-center gap-1">

                            {/* Voice */}
                            <button
                                type="button"
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition"
                            >
                                <Mic size={18} />
                            </button>

                            {/* Send */}
                            <button
                                type="submit"
                                className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#9ACF75] text-[#101410] hover:bg-[#A8DC83] transition shadow-[0_0_20px_rgba(154,207,117,0.12)]"
                            >
                                <ArrowUp size={19} strokeWidth={2.5} />
                            </button>

                        </div>
                    </div>

                    {/* Bottom Hint */}
                    <div className="flex items-center justify-center gap-1.5 mt-2.5">
                        <Sparkles size={11} className="text-[#9ACF75]/40" />
                        <p className="text-[10px] text-white/20">
                            AI can make mistakes. Check important information.
                        </p>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default MessageInput;