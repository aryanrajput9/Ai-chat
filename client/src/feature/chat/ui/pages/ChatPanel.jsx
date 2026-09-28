import { useEffect } from "react";
import useAiHook from "../../hook/aiHook";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setConversations, setLoading } from "../../state/AiSlice";


function ChatPanel() {

    const { getConversationHook } = useAiHook();

    const dispatch = useDispatch()

    useEffect(() => {
        const handleData = async () => {

            try {
                const resp = await getConversationHook();

                dispatch(setConversations(resp))


            } catch (error) {
                toast("something is wrong");
                console.log(error)
            } finally {
                dispatch(setLoading(false))
            }
        };

        handleData()
    }, [])

    return (
        <div className="flex flex-col flex-1 min-w-0 h-screen bg-[#090B09]">

            {/* Header */}
            <ChatHeader />

            {/* Messages */}
            <MessageList />

            {/* Input */}
            <MessageInput />

        </div>
    );
}

export default ChatPanel;