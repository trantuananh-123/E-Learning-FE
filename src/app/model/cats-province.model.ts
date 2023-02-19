import { CatsNation } from "./cats-nation.model";

export class CatsProvince {
    id!: number;
    name!: string;
    code!: string;
    catsNation!: CatsNation;
    createDate!: Date;
    updateDate!: Date;
    isActive!: boolean;
    isDelete!: boolean;
}
