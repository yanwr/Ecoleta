import APi from '../apis';
import { CollectionPoint } from '../models';

export const createPoint = async (data:CollectionPoint, imageToUpload:File) => {
    try {
        const image = await handleUploadImage(imageToUpload);
        const body = {...data, image };
        const response = await APi.post('/points', body);
        console.log('Request to /points. RESPONSE: ', response);
        return response.data;
    } catch (e) {
        return new Error("REQUEST FAIL");
    }
};

const handleUploadImage = async (file:File) => {
    try {
        const body = new FormData();
        body.append('image', file);
        const response = await APi.post('/points/upload/image', body);
        return response.data;
    } catch (e) {
        return new Error("RESQUET FAIL");
    }
};