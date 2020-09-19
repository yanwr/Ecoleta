import CollectionItem from "./CollectionItem";
import User from './User';

export default interface Point {
    id: number;
    user_id: number;
    name: string;
    email: string;
    image: string;
    image_url:string;
    address_latitude: number;
    address_longitude: number;
    address_number: string;
    address_city: string;
    address_uf: string;
    user: User;
    itens:CollectionItem[];
};