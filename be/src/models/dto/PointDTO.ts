import POINT from "../Point";
import { serializedData } from '../../utils/helpFunctions';

export interface POINT_DTO extends POINT {
    image_url:string;
};

export default class PointDTO {

    private points:POINT[] = [];

    constructor(){};
    
    get get():POINT_DTO[]{
        const data:POINT_DTO[] = serializedData(this.points);
        return data;
    };

    set set(point:POINT) {
        this.points.push(point);
    };
}