import APi from '../apis';
import CollectionItem from '../models/CollectionItem';
import { noNullnoEmpty } from '../shared';

interface Filter {
    address_uf: string;
    address_city:string;
    itens: CollectionItem[];
}

export async function loadPoints(filter:Filter | any = null) {
    console.log('Try to load whole points');
    try {
        const query = formatQuery(filter);
        const finalQuery = query.length > 0 ? `/points/itens${query}` : '/points';
        console.log(finalQuery);
        const response = await APi.get(finalQuery);
        const { points } = response.data;
        //console.log('Load points done', points);
        return points;
    } catch (e) {
        console.error('Fail to load points', e);
    }
};

const formatQuery = (data:Filter | any) => {
    let query = '?';
    for (const key in data) {
        if (noNullnoEmpty(data[key])) {
            query += key + '=' + data[key] + "&";
        }
    }
    const lastIndex = query.lastIndexOf("&");
    query = query.substring(0, lastIndex);
    return query;
};

export async function loadOnePoint(id:number) {
    console.log(`Try to load point ${id}`);
    try {
        const response = await APi.get(`/points/${id}`);
        const point = response.data;
        //console.log(`Load point done`, point);
        return point;
    } catch (e) {
        console.error(`Fail to load point ${id}`, e);
    }
};