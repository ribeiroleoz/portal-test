export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image?: string;
}

export interface IProductForm {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}
