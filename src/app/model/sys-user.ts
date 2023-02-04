import { CatsProvince } from './cats-province';
import { CatsNation } from "./cats-nation";

export class SysUser {
    id!: string;
    firstName!: string;
    lastName!: string;
    username!: string;
    phone!: string;
    email!: string;
    birthday!: Date;
    address!: string;
    role!: number;
    catsNation!: CatsNation;
    catsProvince!: CatsProvince;
    createDate!: Date;
    updateDate!: Date;
    isActive!: boolean;
    isDelete!: boolean;
}
