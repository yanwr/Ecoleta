import APi from '../apis';

export const loadItens = async () => {
    try {
        const response = await APi.get('/itens');
        console.log('Request to /itens. RESPONSE: ', response);
        return response.data;
    } catch (error) {
        return new Error("REQUEST FAIL");
    }
};