import express from 'express'
import { createProducts, deleteProduct, getProduct, getProducts, sortProducts, updateProducts } from '../controllers/products'
const router = express.Router()

router.route('/products').post(createProducts).get(getProducts)
router.route('/products/:id').get(getProduct).patch(updateProducts).delete(deleteProduct)
router.route('/products/filters/new').get(sortProducts)

export default router