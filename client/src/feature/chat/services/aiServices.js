
import axioseInstance from "../../../api/axios";
import store from "../../../app/store";




const aiServices = {

    craeteCiverstaion: async (data) => {
        const resp = await axioseInstance.post("/conversation", data);
        return resp
    },
    getCoverstation: async () => {
        const resp = await axioseInstance.get("/conversation");
        return resp.data.data
    },
    createMessage: async (data) => {
        const resp = await axioseInstance.post("/message/conversationId", data);
        return resp
    },
    getConvesationMessage: async (id) => {
        const resp = await axioseInstance.get(`message/allMessage/${id}`);
        return resp
    }
};

export const chatService = async (data, onToken) => {

    const token = store.getState().auth.accessToken;
    const response = await fetch(
        "http://localhost:3000/api/v1/conversation",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,



            },
            credentials: "include",
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, {
            stream: true,
        });

        const events = buffer.split("\n\n");

        buffer = events.pop() || "";

        for (const event of events) {

            if (!event.startsWith("data:")) {
                continue;
            }

            const data = event
                .replace(/^data:\s*/, "")
                .trim();

            if (!data) continue;

            const parsed = JSON.parse(data);

            if (parsed.type === "token") {
                onToken(parsed.content);
            }

            if (parsed.type === "done") {
                return parsed;
            }
        }
    }
};


export default aiServices