import {Request, Response, response} from 'express'
import connectionDB from '../database/connection'

class ProdSaleController {
    async create (request: Request, response: Response){
        const {
            qty,
            id_product
        } = request.body

        const prodSale = {
            qty,
            id_product
        }

        const [id] = await connectionDB('product_sale').insert(prodSale)

        return response.json({
            id,
            qty,
            id_product
        })
    }

    async list (request: Request, response: Response){
        const prodSales = await connectionDB('product_sale').select('*')

        return response.json(prodSales)
    }
}

export default ProdSaleController