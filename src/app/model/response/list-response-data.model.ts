export class ListResponseData<T> {
    status!: number;
    message!: string;
    totalItem!: number;
    page!: number;
    size!: number;
    data!: T;
}