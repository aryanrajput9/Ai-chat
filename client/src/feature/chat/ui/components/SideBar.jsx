
import {
    MessageSquare,
    Plus,
    Search,
    MoreHorizontal,
    Settings,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentConversation, selectConversationLoading, selectConversations, setMessages, } from "../../state/AiSlice";
import Spinner from "../../../../utils/components/Spinner";
import useAiHook from "../../hook/aiHook";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constant";
import { selectUser } from "../../../auth/state/authSlice";

function SideBar() {


    const navigate = useNavigate()

    const conversations = useSelector(selectConversations);
    const isLoading = useSelector(selectConversationLoading);
    const { getConvesationMessageHook } = useAiHook();

    const dispatch = useDispatch();
    const user = useSelector(selectUser);


    if (isLoading) {
        return <Spinner />
    };

    const handleId = async (id) => {
        const resp = await getConvesationMessageHook(id);
        dispatch(clearCurrentConversation());
        dispatch(setMessages(resp.data.data))
    }

    return (
        <aside className="w-[280px] h-screen bg-[#0B0D0B] border-r border-white/[0.07] flex flex-col text-white">

            {/* Header */}
            <div className="h-[72px] px-4 flex items-center justify-between border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#9ACF75]/10 border border-[#9ACF75]/20 flex items-center justify-center">
                        <MessageSquare size={18} className="text-[#9ACF75]" />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold tracking-wide">
                            Conversations
                        </h2>
                        <p className="text-[11px] text-white/35">
                            Your recent chats
                        </p>
                    </div>
                </div>

                <button onClick={() => { dispatch(clearCurrentConversation()); navigate(`${ROUTES.CONVERSATIONS}`) }} className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.04] hover:bg-[#9ACF75]/10 hover:text-[#9ACF75] transition">
                    <Plus size={18} />
                </button>
            </div>

            {/* Search */}
            <div className="px-4 py-4">
                <div className="h-10 px-3 flex items-center gap-2.5 rounded-xl bg-[#121512] border border-white/[0.06]">
                    <Search size={16} className="text-white/35" />

                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/25"
                    />
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1.5 scrollbar-thin">

                <p className="px-2 mb-2 text-[10px] uppercase tracking-[0.15em] text-white/25">
                    Recent
                </p>

                {conversations.map((conversation, index) => (
                    <button
                        onClick={() => handleId(conversation._id)}
                        key={conversation._id}
                        className={`group w-full text-left px-3 py-3 rounded-xl transition ${index === 0
                            ? "bg-[#9ACF75]/10 border border-[#9ACF75]/10"
                            : "hover:bg-white/[0.04]"
                            }`}
                    >
                        <div className="flex items-start gap-3">

                            <div
                                className={`mt-0.5 w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${index === 0
                                    ? "bg-[#9ACF75]/15 text-[#9ACF75]"
                                    : "bg-white/[0.05] text-white/40"
                                    }`}
                            >
                                <MessageSquare size={15} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p
                                    className={`text-sm truncate ${index === 0
                                        ? "text-white font-medium"
                                        : "text-white/70"
                                        }`}
                                >
                                    {conversation.title}
                                </p>

                                <p className="mt-1 text-[11px] text-white/25">
                                    {conversation.time}
                                </p>
                            </div>

                            <MoreHorizontal
                                size={16}
                                className="mt-1 shrink-0 text-white/0 group-hover:text-white/30 transition"
                            />
                        </div>
                    </button>
                ))}
            </div>

            {/* Bottom */}
            <div className="p-3 border-t border-white/[0.06]">
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.04] transition">
                    <div className="w-9 h-9 rounded-full bg-[#9ACF75]/15 border border-[#9ACF75]/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-[#9ACF75]">
                            {user.username[0].toUpperCase()}
                        </span>
                    </div>

                    <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-white/80">
                            {user.username}
                        </p>
                        <p className="text-[11px] text-white/30">
                            Personal account
                        </p>
                    </div>

                    <Settings size={17} className="text-white/30" />
                </button>
            </div>

        </aside>
    );
}

export default SideBar;