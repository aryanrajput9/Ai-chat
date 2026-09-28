
import {
    Bot,
    MoreVertical,
    PanelLeft,
    Sparkles,
} from "lucide-react";

function ChatHeader() {
    return (
        <header className="h-[68px] shrink-0 px-5 border-b border-white/[0.06] bg-[#0B0D0B] flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-3">

                {/* Mobile / Sidebar Toggle */}
                <button
                    type="button"
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.05] transition"
                >
                    <PanelLeft size={18} />
                </button>

                {/* AI Avatar */}
                <div className="w-9 h-9 rounded-xl bg-[#9ACF75]/10 border border-[#9ACF75]/20 flex items-center justify-center">
                    <Bot size={18} className="text-[#9ACF75]" />
                </div>

                {/* Chat Info */}
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-white">
                            AI Assistant
                        </h2>

                        <span className="flex items-center gap-1 text-[10px] text-[#9ACF75]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9ACF75]" />
                            Online
                        </span>
                    </div>

                    <div className="flex items-center gap-1 mt-0.5">
                        <Sparkles size={11} className="text-[#9ACF75]/50" />
                        <p className="text-[11px] text-white/25">
                            Your intelligent assistant
                        </p>
                    </div>
                </div>
            </div>

            {/* Right */}
            <button
                type="button"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.05] transition"
            >
                <MoreVertical size={19} />
            </button>

        </header>
    );
}

export default ChatHeader;