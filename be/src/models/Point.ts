import ITENS from './Item';
export default interface POINT {
    id:number;
    user_id:number;
    name:string;
    email:string;
    image:string;
    address_latitude:number;
    address_longitude:number;
    address_number:string;
    adrress_city:string;
    adrress_uf:string;
    itens?:ITENS[];
};