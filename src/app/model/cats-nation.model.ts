import { CatsProvince } from "./cats-province.model";

export class CatsNation {
    id!: number;
    name!: string;
    code!: string;
    catsProvinces!: Array<CatsProvince>;
    createDate!: Date;
    updateDate!: Date;
    isActive!: boolean;
    isDelete!: boolean;
}
