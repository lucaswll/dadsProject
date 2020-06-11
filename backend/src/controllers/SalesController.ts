import {Request, Response} from 'express'
import connectionDB from '../database/connection'

class SalesController {
    async create (request: Request, response: Response){
        const {
            id,
            date,
            id_client,
            id_prodSale
        } = request.body

        const trx = await connectionDB.transaction()

        const sale = {
            id,
            date,
            id_client
        }

        const insertSaleIds = await trx('sales').insert(sale)
        
        const id_sales = insertSaleIds[0]

        const sale_products = id_prodSale.map((id_prodSale: number) => {
            return {
                id_prodSale,
                id_sales
            }
        })

        await trx('sales_products').insert(sale_products)

        await trx.commit()

        return response.json({
            ...sale,
            id_prod_sales: id_prodSale
        })
    }

    async list (request: Request, response: Response) {
        const sales = await connectionDB('sales').select('*')

        const serializeSales = sales.map(sale => {
            return {
                id: sale.id,
                date: sale.date,
                id_client: sale.id_client
            }
        })

        const prods = await connectionDB('product_sale')
            .join('sales_products', 'product_sale.id', '=','sales_products.id_prodSale')
            .select('product_sale.id','product_sale.id_product', 'product_sale.qty')

        return response.json({serializeSales, prods})
    }

    async listSpecificSale(request: Request, response: Response){
        const { id } = request.params

        const sale = await connectionDB('sales').where('id', id).first()

        if(!sale){
            return response.status(400).json({ message: 'Sale not found' })
        }

        const id_client = sale.id_client
        const client = await connectionDB('clients').where('id', id_client).first()          

        const prods = await connectionDB('sales')
            .where('id_client','id')
            .select('*')

        return response.json({sale, client, prods})
    }
}

export default SalesController