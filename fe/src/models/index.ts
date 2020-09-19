export interface CollectionItem {
    id:number,
    name:string,
    image_url:string,
};

export interface IBGE_UF_RESPONSE {
    id:number,
    sigla:string
};

export interface IBGE_CITY_RESPONSE {
    id:number,
    nome:string,
};

export interface IBGE_FORMATED {
    id:number;
    value:string,
};

export interface CollectionPoint {
    user_id: number,
    email: string,
    name: string,
    image?: string,
    address_latitude: number,
    address_longitude: number,
    address_number: string,
    address_city: string,
    address_uf: string,
    itens:number[]
};