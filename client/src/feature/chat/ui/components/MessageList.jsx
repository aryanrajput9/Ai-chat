import { Bot, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { useSelector } from "react-redux";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { selectMessages } from "../../state/AiSlice";

function MessageList() {
    const messages = useSelector(selectMessages);

    return (
        <div className="flex-1 overflow-y-auto bg-[#090B09]">
            <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

                {messages.map((message, index) => {
                    const isUser = message.role === "user";

                    return (
                        <div
                            key={message._id || message.id || index}
                            className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"
                                }`}
                        >
                            {/* AI Avatar */}
                            {!isUser && (
                                <div className="w-9 h-9 shrink-0 rounded-xl bg-[#9ACF75]/10 border border-[#9ACF75]/20 flex items-center justify-center">
                                    <Bot
                                        size={18}
                                        className="text-[#9ACF75]"
                                    />
                                </div>
                            )}

                            <div
                                className={`max-w-[75%] ${isUser ? "order-first" : ""
                                    }`}
                            >
                                {/* Message */}
                                <div
                                    className={`px-4 py-3 rounded-2xl text-sm leading-6 ${isUser
                                        ? "bg-[#9ACF75] text-[#101410] rounded-br-md"
                                        : "bg-[#121512] border border-white/[0.06] text-white/80 rounded-bl-md"
                                        }`}
                                >
                                    {isUser ? (
                                        message.content
                                    ) : (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                /* Paragraph */
                                                p: ({ children }) => (
                                                    <p className="mb-3 last:mb-0">
                                                        {children}
                                                    </p>
                                                ),

                                                /* Bold */
                                                strong: ({ children }) => (
                                                    <strong className="font-semibold text-white">
                                                        {children}
                                                    </strong>
                                                ),

                                                /* Italic */
                                                em: ({ children }) => (
                                                    <em className="text-white/90">
                                                        {children}
                                                    </em>
                                                ),

                                                /* H1 */
                                                h1: ({ children }) => (
                                                    <h1 className="text-xl font-semibold text-white mb-3">
                                                        {children}
                                                    </h1>
                                                ),

                                                /* H2 */
                                                h2: ({ children }) => (
                                                    <h2 className="text-lg font-semibold text-white mb-3">
                                                        {children}
                                                    </h2>
                                                ),

                                                /* H3 */
                                                h3: ({ children }) => (
                                                    <h3 className="text-base font-semibold text-white mb-2">
                                                        {children}
                                                    </h3>
                                                ),

                                                /* Unordered List */
                                                ul: ({ children }) => (
                                                    <ul className="list-disc ml-5 mb-3 space-y-1">
                                                        {children}
                                                    </ul>
                                                ),

                                                /* Ordered List */
                                                ol: ({ children }) => (
                                                    <ol className="list-decimal ml-5 mb-3 space-y-1">
                                                        {children}
                                                    </ol>
                                                ),

                                                /* List Item */
                                                li: ({ children }) => (
                                                    <li>{children}</li>
                                                ),

                                                /* Blockquote */
                                                blockquote: ({ children }) => (
                                                    <blockquote className="border-l-2 border-[#9ACF75] pl-4 my-3 text-white/60">
                                                        {children}
                                                    </blockquote>
                                                ),

                                                /* Inline + Block Code */
                                                code: ({
                                                    inline,
                                                    className,
                                                    children,
                                                    ...props
                                                }) => {
                                                    const match =
                                                        /language-(\w+)/.exec(
                                                            className || ""
                                                        );

                                                    /* Inline code */
                                                    if (inline) {
                                                        return (
                                                            <code
                                                                className="px-1.5 py-0.5 rounded-md bg-white/[0.08] text-[#9ACF75] text-[13px]"
                                                                {...props}
                                                            >
                                                                {children}
                                                            </code>
                                                        );
                                                    }

                                                    /* Code block */
                                                    return (
                                                        <div className="my-4 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0D0F0D]">
                                                            {/* Code Header */}
                                                            <div className="flex items-center justify-between px-4 py-2.5 bg-[#151815] border-b border-white/[0.06]">
                                                                <span className="text-xs text-white/40">
                                                                    {match
                                                                        ? match[1]
                                                                        : "code"}
                                                                </span>

                                                                <button
                                                                    onClick={() =>
                                                                        navigator.clipboard.writeText(
                                                                            String(
                                                                                children
                                                                            ).replace(
                                                                                /\n$/,
                                                                                ""
                                                                            )
                                                                        )
                                                                    }
                                                                    className="text-xs text-white/40 hover:text-white/80 transition"
                                                                >
                                                                    Copy
                                                                </button>
                                                            </div>

                                                            {/* Syntax Highlighted Code */}
                                                            <SyntaxHighlighter
                                                                style={oneDark}
                                                                language={
                                                                    match
                                                                        ? match[1]
                                                                        : "text"
                                                                }
                                                                PreTag="div"
                                                                customStyle={{
                                                                    margin: 0,
                                                                    padding:
                                                                        "16px",
                                                                    background:
                                                                        "#0D0F0D",
                                                                    fontSize:
                                                                        "13px",
                                                                    lineHeight:
                                                                        "1.7",
                                                                }}
                                                                codeTagProps={{
                                                                    style: {
                                                                        fontFamily:
                                                                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                                                                    },
                                                                }}
                                                            >
                                                                {String(
                                                                    children
                                                                ).replace(
                                                                    /\n$/,
                                                                    ""
                                                                )}
                                                            </SyntaxHighlighter>
                                                        </div>
                                                    );
                                                },

                                                /* Pre */
                                                pre: ({ children }) => (
                                                    <>{children}</>
                                                ),

                                                /* Links */
                                                a: ({ children, href }) => (
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#9ACF75] hover:underline"
                                                    >
                                                        {children}
                                                    </a>
                                                ),

                                                /* Horizontal line */
                                                hr: () => (
                                                    <hr className="my-4 border-white/[0.08]" />
                                                ),
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    )}

                                    {/* Streaming cursor */}
                                    {message.isStreaming && (
                                        <span className="ml-1 inline-block animate-pulse">
                                            ▋
                                        </span>
                                    )}
                                </div>

                                {/* AI Actions */}
                                {!isUser && !message.isStreaming && (
                                    <div className="flex items-center gap-1 mt-2 ml-1">
                                        <button className="p-1.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.04] transition">
                                            <Copy size={14} />
                                        </button>

                                        <button className="p-1.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.04] transition">
                                            <ThumbsUp size={14} />
                                        </button>

                                        <button className="p-1.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.04] transition">
                                            <ThumbsDown size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* User Avatar */}
                            {isUser && (
                                <div className="w-9 h-9 shrink-0 rounded-xl bg-white/[0.07] border border-white/[0.08] flex items-center justify-center">
                                    <span className="text-sm font-semibold text-white/70">
                                        A
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MessageList;