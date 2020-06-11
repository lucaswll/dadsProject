import {Request, Response} from 'express'
import connectionDB from '../database/connection'

class ProductController {

    async list(request: Request, response: Response){
        const products = await connectionDB('products').select('*')

        const serializeProducts = products.map(prod => {
            return {
                id: prod.id,
                name: prod.name,
                price: prod.price,
                commission: prod.commission
            }
        })

        return response.json(serializeProducts)
    }

    async listSpecificProduct(request: Request, response: Response){
        const  { id } = request.params

        const product = await connectionDB('products').where('id', id).first()


        return response.json(product)
    }

    async create(request: Request, response: Response){
        const { name, price, commission } = request.body

        const [products_id] = await connectionDB('products').insert({ 
            name,
            price,
            commission,
        })//create é != pq preciso pegar o id, que é auto-increment na tab products

        return response.json({ products_id })
    }

    async delete(request: Request, response: Response){
        const { id } = request.params //params é o que vem na rota dps do /

        await connectionDB('products').where('id', id).delete()
        
        return response.send(`O produto de id = ${id} foi deletado.`)
    }
}

export default ProductController