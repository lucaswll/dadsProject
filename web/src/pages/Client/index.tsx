import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import axios from 'axios'

import './styles.css'

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const Client = () => {

    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const [selectedUf, setSelectedUf] = useState('0') 
    const [selectedCity, setSelectedCity] = useState('0')

    const history = useHistory()

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla)

            setUfs(ufInitials)
        })
    }, [])

    useEffect(() => { //carregar as cidades sempre que a UF mudar
        if (selectedUf === '0'){
            return
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const citieNames = response.data.map(city => city.nome)

            setCities(citieNames)
        })
    }, [selectedUf])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){ //to passando pra ele o valor de um SELECT
        const uf = event.target.value  //traz a uf selecionada

        setSelectedUf(uf)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){ //to passando pra ele o valor de um SELECT
        const city = event.target.value  //traz a uf selecionada

        setSelectedCity(city)
    }


    const [formData, setFormData] = useState({
        name: '',
        description: '',
        fone: ''
    })

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault()

        const { name, description, fone } = formData
        const uf = selectedUf
        const city = selectedCity

        const data = {
            name,
            description,
            fone,
            city,
            uf
        }

        console.log(data)

        await api.post('/clients', data)
        alert(`Cliente ${data.name} criado com sucesso!`)

        history.push('/clients')
    }


    return (
        <div id='create_client_page'>
            <div className='content'>              
                <main>
                    <header>
                        <Link to="/clients">
                            <FiArrowLeft />
                            <strong>Voltar</strong>
                        </Link>
                    </header>
                    
                    <form onSubmit={handleSubmit}>
                        <h1>Cadastro de cliente</h1>

                        <fieldset>
                            <legend>
                                <h2>Dados pessoais</h2>
                            </legend>

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
                                    <label htmlFor="description">Descrição </label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="fone">WhatsApp </label>
                                    <input
                                        type="text"
                                        name="fone"
                                        id="fone"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>                    
                        </fieldset>

                        <fieldset>
                            
                            <h2>Localidade</h2>
                            
                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="uf">Estado (UF)</label>
                                    <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                        <option value="0">UF </option>
                                        {ufs.map(uf => (
                                            <option key={uf} value={uf}>{uf}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="field">
                                    <label htmlFor="city">Cidade</label>
                                    <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                        <option value="0"> Cidade </option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
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

export default Client