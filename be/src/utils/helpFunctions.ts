import { URL_GET_IMAGE as URL_POINTS } from '../routes/PointRoutes';  
import { URL_GET_IMAGE as URL_ITENS } from '../routes/ItemRoutes';  

export function serializedData(data:any, isPoints:boolean = true) {
    let finalUrl = '';
    if(Array.isArray(data)){
        return data.map( x => {
            finalUrl = isPoints 
        ? `http://192.168.0.15:3333${URL_POINTS}/${x.image}`
        : `http://192.168.0.15:3333${URL_ITENS}/${x.image}`;
            return {
                ...x,
                image_url: finalUrl
            };
        });
    } else {
        finalUrl = isPoints 
        ? `http://192.168.0.15:3333${URL_POINTS}/${data.image}`
        : `http://192.168.0.15:3333${URL_ITENS}/${data.image}`;
        return {
            ...data,
            image_url: finalUrl
        };
    }
};