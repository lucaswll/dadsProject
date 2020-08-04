import React, { useState, ChangeEvent, FormEvent} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

const Product = () => {

    const history = useHistory()

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        commission: ''
    })

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault()

        const { name, price, commission } = formData

        const data = {
            name,
            price,
            commission
        }

        console.log(data)

        await api.post('/products', data)
        alert(`Produto ${data.name} inserido com sucesso!`)

        history.push('/')
    }


    return (
        <div id='create_product_page'>
            <div className="content">
                <main>
                    <header>
                        <Link to="/">
                            <FiArrowLeft />
                            Voltar
                        </Link>
                    </header>
                    
                    <form onSubmit={handleSubmit}>
                        <h1>Cadastro de produto</h1>

                        <fieldset>
                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="name">Nome </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="price">Preço </label>
                                    <input
                                        type="decimal"
                                        name="price"
                                        id="price"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="comission">Comissão </label>
                                    <input
                                        type="decimal"
                                        name="commission"
                                        id="commission"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>                    
                        </fieldset>

                        <button type="submit">Cadastrar</button>

                    </form>
                </main>
            </div>
            

        </div>
    )
}

export default Product