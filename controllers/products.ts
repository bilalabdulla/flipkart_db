import { NextFunction, Request, Response } from "express"
import { createProductsService, deleteProductService, filterProductsService, getProductService, getProductsService, updateProductsService } from "../services/products"
import { CreateProductQueryParams } from "../types/query-params"
import { createProductParams } from "../types/params"
import { CreateProductDto } from "../dtos/createProduct.dto"

export const createProducts = async (req: Request<{}, {}, CreateProductDto>, res: Response, next: NextFunction) => {
    
    if (req.body === null) {
        return res.status(404).json("please provide all the details")
    }

    try {
        const product = await createProductsService(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(404).json(error) 
    }
}

export const getProduct = async (req: Request<createProductParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    try {
        const product = await getProductService(id)
        res.status(201).json(product)
    } catch (error) {
        return next(error)
    }
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProductsService()
        res.json(products)
    } catch (error) {
        return next(error)   
    }
}

export const sortProducts = async (req: Request<{}, {}, CreateProductDto, CreateProductQueryParams>, res: Response) => {
    const { sort, ram, brand, rating_gte} = req.query
    
    let brandArray: string[] = []
    let ramArray: number[] = []
    let newSort: string
    let ratingArray: number[] = []
    
    if (sort.match('-')) {
        newSort = sort?.split('-')[1]
    } else {
        newSort = sort
    }

    if (Array.isArray(brand)) {
        for (let i = 0; i < brand.length; i++) {
            brandArray?.push(brand[i])
    }
    } else {
        brandArray?.push(brand)
    }

    if (Array.isArray(ram)) {
        for (let i = 0; i < ram.length; i++) {
            ramArray?.push(ram[i])
        }
    } else {
        ramArray?.push(ram)
    }

    if (Array.isArray(rating_gte)) {
        for (let i = 0; i < rating_gte.length; i++) {
            ratingArray?.push(Number(rating_gte[i]))
        }
    } else {
        ratingArray?.push(Number(rating_gte))
    }

    try {
        const product: any = await filterProductsService(req.query, brandArray, ramArray, ratingArray, newSort)
        const { products , count } = product
        res.status(200).json({ count, products })
    } catch (error) {
        return res.status(403).json(error)
    }
 }

export const updateProducts = async (req: Request<createProductParams>, res: Response) => {
    const id = req.params.id    
    const data = req.body
     
    try {
        const product = await updateProductsService(id, data) 
        return res.status(201).json(product)
    } catch (error) {
        return res.status(403).json(error)
    }
 }

export const deleteProduct = async (req: Request<createProductParams>, res: Response, next: NextFunction) => {
    const { id } = req.params 
    try {
        const product = await deleteProductService(id)
        res.status(202).json(product)
    } catch (error) {
        return next(error)
    }
 }
