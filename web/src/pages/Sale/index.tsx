import React, { useState, useEffect } from 'react'

import api from '../../services/api'

interface NAMEFormat {
    name: string,
}

interface Prods {
    name: string
}

const Sale = () => {

    const [clients, setClient] = useState<string[]>([])
    const [products, setProducts] = useState<string[]>([])

    const [clientSelect, setClientSelect] = useState('')
    const [prodSelect, setProdSelect] = useState('')
    
    useEffect(() => {
        api.get<NAMEFormat[]>('/clients').then(response => {
            const clientsName = response.data.map(client => client.name)

            setClient(clientsName)
        })
    })

    useEffect(() => {
        api.get<Prods[]>('/products').then(response => {
            const prodsName = response.data.map(prods => prods.name)

            setProducts(prodsName)
        })
    })

    return(
        <div id="create_sale_page">
            <div className="content">
                <fieldset>
                                
                    <h2>Pedido de venda</h2>
                    
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Cliente </label>
                            <select
                                name="client"
                                id="client"
                                value={clientSelect}
                                onChange = {(e) => setClientSelect(e.target.value)}
                            >
                                <option value="0">Cliente </option>
                                {clients.map((client) => (  
                                    <option key={client} value={client}>{client}</option>
                                ))}
                            </select>
                        
                            <select
                                name="product"
                                id="product"
                                value={prodSelect}
                                onChange = {(e) => setProdSelect(e.target.value)}
                            >
                                <option value='0'>sx </option>
                                {products.map((prod) => (
                                    <option key={prod} value={prod}>{prod}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                                    
                </fieldset>
            </div>
        </div>
    )
}

export default Sale