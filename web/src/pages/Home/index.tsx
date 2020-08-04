import React from 'react'
import { Link } from 'react-router-dom'
import {FiGrid, FiShoppingCart, FiShoppingBag} from 'react-icons/fi'
import './styles.css'

const Home = () => {
    return (
        <div id='home_page'>
            <div className='content'>

                <header>
                    <h1>Bem-vindo !</h1>
                </header>

                <main>
                    <Link to="/clients">
                        <span>
                            <FiGrid/>
                        </span>
                        <strong>Clientes</strong>
                    </Link>

                    <Link to="/products">
                        <span>
                            <FiShoppingBag/>
                        </span>
                        <strong>Produtos</strong>
                    </Link>

                    <Link to="/sales">
                        <span>
                            <FiShoppingCart/>
                        </span>
                        <strong>Vendas</strong>
                    </Link>
                    
                </main>
            </div>

        </div>
    )
}

export default Home