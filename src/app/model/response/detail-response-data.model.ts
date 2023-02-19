export class DetailResponseData<T> {
    status!: number;
    message!: string;
    totalItem!: number;
    data!: T;
}