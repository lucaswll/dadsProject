import {Request, Response} from 'express'
import connectionDB from '../database/connection'

class ClientController{

    async list(request: Request, response: Response){
        const clients = await connectionDB('clients').select('*')
        
        const serializeClients = clients.map(client => {
            return {
                id: client.id,
                name: client.name,
                description: client.description,
                fone: client.fone,
                city: client.city,
                uf: client.uf
            }
        })

        return response.json(serializeClients)
    }

    async listSpecificClient(request: Request, response: Response){
        const { id } = request.params

        const client = await connectionDB('clients').where('id', id).first()

        if(!client){
            return response.status(400).json({ message: 'Client not found' })
        }

        return response.json(client)
    }

    async create(request: Request, response: Response) {
        const {
            name,
            description,
            fone,
            city,
            uf
        } = request.body

        const [id_client] = await connectionDB('clients').insert({ //node aguarda essa conexão com o bd, pra dar o return
            name, 
            description,  
            fone,
            city,
            uf
        })

        return response.json({ id_client })
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params //params é o que vem na rota dps do /

        await connectionDB('clients').where('id', id).delete()

        return response.status(204).send()
    }
}

export default ClientController