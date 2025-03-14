export interface Product {
    _id?: string;
    name: string;
    shortDescription: string;
    description: string;
    Price: number;
    discount: number;
    images: string[];
    categoryId: string;
    brandId: string;
    isFeatured: boolean;
    isNewProduct: boolean;
}