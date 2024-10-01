import { Op } from "sequelize"
import db from "../models"
import { ProductAttributes } from "../types/product"
import { QueryAttributes } from "../types/query-params"

export const createProductsService = async (data: ProductAttributes) => {
    try {
        const product = await db.Product.create(data)
        return product
    } catch (error) {
        return error 
    }
}

export const getProductService = async (id: number) => {
    try {
        const product = await db.Product.findOne({
            where: {id}
        })
        return product
    } catch (error) {
        return error 
    }
}

export const filterProductsService = async (query: QueryAttributes, brandArray: string[], ramArray: number[], ratingArray: number[], newSort: string) => {
    const { sort, ram, price_gte, price_lte, 
        brand, assured, page, rating_gte
     } = query

     try {
        const product = await db.Product.findAndCountAll({
            limit: 10,
            offset: (page - 1) * 10,
            where: {ram: ram ? [ramArray[0], ramArray[1], ramArray[2], ramArray[3], ramArray[4], ramArray[5], ramArray[6], ramArray[7], ramArray[8]] : ['2000','4000','6000', '16000', '32000', '64000'], 
                price: {[Op.between]: [price_gte, price_lte]},
                brand: brand ? [brandArray[0], brandArray[1], brandArray[2]] : ['mi', 'moto', 'samsung'],
                rating: rating_gte ? {[Op.between]: [Math.min(...ratingArray), 5]} : {[Op.between]: [0, 5]},
                assured: assured || [true, false]},
            order: [[newSort, sort.match('-') ? 'DESC' : 'ASC']],
        })

        // const count = await db.Product.count({
        //     where: {ram: ram ? [ramArray[0], ramArray[1], ramArray[2], ramArray[3], ramArray[4], ramArray[5], ramArray[6], ramArray[7], ramArray[8]] : ['2000','4000','6000', '16000', '32000', '64000'], price: {[Op.between]: [price_gte, price_lte]},
        //     brand: brand ? [brandArray[0], brandArray[1], brandArray[2]] : ['mi', 'moto', 'samsung'],
        //     rating: rating_gte ? {[Op.between]: [Math.min(...ratingArray), 5]} : {[Op.between]: [0, 5]},
        //     assured: assured || [true, false]}
        // }) 

        const { count, rows: products } = product
        return {count, products}
    } catch (error) {
        return error     
    }
}

export const getProductsService  = async () => {
    try {
        const products = await db.Product.findAll({})
        return products
    } catch (error) {
        return error
    }
}

export const updateProductsService = async (id: number, data: ProductAttributes) => {
    try {
        const product = await db.Product.update(data, {
            where: {id}
        })
        return product
    } catch (error) {
        return error 
    }
}

export const deleteProductService = async (id: number) => {
    try {
        const product = await db.Product.findOne({
            where: {id}
        })

        await product.destroy()

        return "deleted product"
    } catch (error) {
        return error
    }
}
