import express from 'express'
import ClientController from './controllers/ClientController'
import ProductController from './controllers/ProductController'
import SalesController from './controllers/SalesController'
import ProdSaleController from './controllers/ProdSaleController'

const routes = express.Router()

const clientController = new ClientController()
const productController = new ProductController()
const salesController = new SalesController()
const prodSaleController = new ProdSaleController()

routes.post('/clients', clientController.create)
routes.post('/products', productController.create)
routes.post('/sales', salesController.create)
routes.post('/prodsale', prodSaleController.create)

routes.get('/clients', clientController.list)
routes.get('/products', productController.list)
routes.get('/sales', salesController.list)
routes.get('/prodsale', prodSaleController.list)

routes.get('/specificclient/:id', clientController.listSpecificClient)
routes.get('/specificproduct/:id', productController.listSpecificProduct)
routes.get('/specificsale/:id', salesController.listSpecificSale)

routes.delete('/clients/:id', clientController.delete)
routes.delete('/products/:id', productController.delete)

export default routes