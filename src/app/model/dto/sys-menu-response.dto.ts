export class SysMenuResponseDTO {
    id!: number;
    parentId!: number;
    code!: string;
    name!: string;
    path!: string;
    children!: Array<SysMenuResponseDTO>;
}
