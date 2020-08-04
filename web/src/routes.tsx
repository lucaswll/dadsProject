import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import Client from './pages/Client'
import Product from './pages/Product'
import ListClient from './pages/ListClient'
import Sale from './pages/Sale'

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact></Route>
            <Route component={Client} path="/clients/new"></Route>
            <Route component={Product} path="/products"></Route>
            <Route component={ListClient} path="/clients" exact></Route>
            <Route component={Sale} path="/sales"></Route>
        </BrowserRouter>
    )
}

export default Routes