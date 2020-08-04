import React, { useEffect, useState } from 'react'
import './styles.css'

import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom'
import { FiPlus , FiTrash2, FiSearch, FiArrowLeft} from 'react-icons/fi'


interface Client { //preciso da interface pois estou armazenando vetores no estado
    id: number,
    name: string;
    description: string;
    fone: string;
    city: string;
    uf: string
}

const ListClient = () => {

    const [clients, setClients] = useState<Client[]>([])
    const [attClients, setAttClients] = useState<Client[]>([])

    const history = useHistory()

    useEffect(() => {
        api.get('/clients').then(response => {
            setClients(response.data)
        })
    })

    function handleNewClient(){
        history.push('/clients/new')
    }

    async function handleDeleteClient(id: Number){
        try{
            await api.delete(`clients/${id}`)

            setClients(clients.filter(client => client.id !== id))
        }catch(error){
            alert('Erro ao tentar excluir o cliente!!')
        }
    }

    async function handleEditClient(id: Number){
        try{
            const teste = await api.get(`specificclient/${id}`)
            setAttClients(teste.data)
            alert('Direcionar para clients/new com dados pre-preenchidos, para edição')
        }catch(error){
            alert('Erro ao tentar editar o cliente!!')
        }
    }

    return (        
        <div className='list_client_page'>
            <header>
                <Link to="/">
                    <FiArrowLeft />
                    <strong>Voltar</strong>
                </Link>                
            </header>  

            <div className="after_header">               
                <span>Cadastro e manutenção de clientes </span>

                <button onClick={handleNewClient} type="button">
                    <FiPlus size={18} color="#6633cc" />                
                </button>
            </div>          

            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        
                        <strong>Nome</strong>
                        <p>{client.name}</p>

                        <strong>WhatsApp</strong>
                        <p>{client.fone}</p>

                        <strong>Localidade</strong>
                        <p>{client.city}-{client.uf}</p>

                        <section>
                            <button onClick={() => handleDeleteClient(client.id)} type="button">
                                <FiTrash2 size={20} color="#c40233" />
                            </button>

                            <button type="button" className="button2" onClick={() => handleEditClient(client.id)}>
                                <FiSearch size={20} color="#36ff26" />
                            </button>
                        </section>                        
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default ListClient