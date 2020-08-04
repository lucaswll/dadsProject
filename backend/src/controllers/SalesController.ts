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

        const sale = await connectionDB('sales')
            .where('id', id)
            .first()

        if(!sale){
            return response.status(400).json({ message: 'Sale not found' })
        }

        const client = await connectionDB('clients')
            .where('id', sale.id_client)
            .first()
            .select('id','name')

        /*const id_prodSale = await connectionDB('sales_products')
            .where('sales_products.id_sales', id)
            .select('id_prodSale') // retorna os ids do prodsale. Quero agora pegar os id_product/qty relacionado a cada uma ↓
        */

        const info_prods = await connectionDB('product_sale')
            .join('sales_products', 'product_sale.id', '=', 'sales_products.id_prodSale')
            .where('sales_products.id_sales', id)
            .select('product_sale.id_product', 'product_sale.qty')

        const id_prods = info_prods.map(values => {    
            const vectorIds = values.id_product 

            return vectorIds
        })

        const commission = await connectionDB('product_sale')
            .join('products', 'product_sale.id_product', '=', 'products.id')
            .whereIn('product_sale.id_product', id_prods) //era so usar o IN MAAANO! PQP
            .select('products.commission')

        const price = await connectionDB('product_sale')
            .join('products', 'product_sale.id_product', '=', 'products.id')
            .whereIn('product_sale.id_product', id_prods) //era so usar o IN MAAANO! PQP
            .select('products.price')

        //valueSale = product_sale.qty * products.price
        //commissionSale = product_sale.qty * products.commission

        const vectorPrice = price.map(values => {
            const vecPrice = values.price

            return vecPrice
        })

        const vectorQties = info_prods.map(values => {    
            const vecQties = values.qty

            return vecQties
        })

        const vectorCommission = commission.map(values => {
            const vecComm = values.commission

            return vecComm
        })

        let valueSale = 0
        let commissionSale = 0

        for(let i=0; i < id_prods.length; i++){ //preciso de um jeito +clean, pq to pegando os selects e dando um map pra fazer um vetor pros calculos
            valueSale = valueSale + vectorQties[i] * vectorPrice[i]
            commissionSale = commissionSale + vectorQties[i] * vectorCommission[i]
        }
       
        return response.json({sale, client, info_prods, valueSale, commissionSale})
    }
}

export default SalesController