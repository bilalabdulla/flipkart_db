export interface CreateProductQueryParams {
    sort: string 
    ram: number 
    brand: string,
    rating_gte: number,
    price: number
    price_gte: number 
    price_lte: number
    assured: boolean 
    page: number 
}

export interface QueryAttributes {
    ram: number
    price: number
    brand: string
    rating_gte: number
    assured: boolean,
    sort: string,
    price_gte: number,
    price_lte: number,
    page: number
}