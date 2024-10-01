import express from 'express'
const app = express()
const port = process.env.PORT || 5014
import db from './models'
import cors from 'cors'

import productsRouter from './routes/products'
import { products } from './seeders/products'

app.use(express.json())
app.use(cors())

app.use('/api/v1', productsRouter)

// const createProducts = () => {
//     products.map((product) => {
//         db.Product.create(product)
//     })
// }
// createProducts()  

app.get('/', async (req, res) => {
    res.status(200).json("good job")
})

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`app is listening on port ${port}`);        
    })
})

