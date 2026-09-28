
import aiServices from "../services/aiServices";





function useAiHook() {

    const createCiverstaionHook = async (data) => {

        const resp = await aiServices.craeteCiverstaion(data);
        return resp
    };
    const getConversationHook = async () => {

        const resp = await aiServices.getCoverstation();
        return resp
    };
    const createMessageHook = async (data) => {

        const resp = await aiServices.createMessage(data);
        return resp
    };

    const getConvesationMessageHook = async (id) => {
        const resp = await aiServices.getConvesationMessage(id);
        return resp
    }





    return { createCiverstaionHook, getConversationHook, createMessageHook, getConvesationMessageHook }
};


export default useAiHook