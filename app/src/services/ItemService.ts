import APi from '../APis';

export async function loadItens() {
    console.log('Try to load whole itens');
    try {
        const response = await APi.get('/itens');
        //console.log('Load itens done', response.data);
        return response.data;
    } catch (e) {
        console.error('Fail to load itens', e);
    }
};