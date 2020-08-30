import APi from '../shared/APi';
import { CollectionPoint } from '../shared/models';

export const createPoint = async (body:CollectionPoint) => {
    try {
        const response = await APi.post('/points', body);
        console.log('Request to /points. RESPONSE: ', response);
        return response.data;
    } catch (error) {
        return new Error("REQUEST FAIL");
    }
};