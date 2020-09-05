import Axios from 'axios';
import { IBGE_UF_RESPONSE, IBGE_CITY_RESPONSE } from '../models/IbgeDTO';

const URLs = {
   UFs: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
   Citys: (id:string) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`
}

export const loadUFs = async () => {
    try {
        const response = await Axios.get<IBGE_UF_RESPONSE[]>(URLs.UFs);
        console.log(`Request to ${URLs.UFs}. RESPONSE: `, response);
        const ufInitials = response.data.map( data => {
            return { id: data.id, value: data.sigla };
        });
        return ufInitials;
    } catch (e) {
        return new Error("REQUEST FAIL");
    }
};

export const loadCitysByUF = async (idUF:string) => {
    try {
        const response = await Axios.get<IBGE_CITY_RESPONSE[]>(URLs.Citys(idUF));
        console.log(`Resquest to ${URLs.Citys(idUF)}. RESPONES: `, response);
        const cities = response.data.map( data => {
            return { id: data.id, value: data.nome };
        });
        return cities;
    } catch (e) {
        return new Error("REQUEST FAIL");
    }
};