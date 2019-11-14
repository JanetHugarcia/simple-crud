'use strict'
const data = require('./../../data');
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('/products', ({ request, response, view }) => {
    return data;
})

Route.get('/products/:id', ({ params }) => {
    if (data[params.id]) {
        return data[params.id];
    }
})

Route.post('/products', ({ request, response, view }) => {
    const newProduct = request.post();
    const id = newProduct['id'];
    if (!data[id]) {
        data[id] = newProduct;
    }
    return data;
})

Route.put('/products', ({ request }) => {
    const newProduct = request.post();
    const id = newProduct['id'];
    if (data[id]) {
        data[id] = newProduct;
    }
    return data;
})

Route.delete('/products/:id', ({ params }) => {
    const id = params.id;
    if (data[id]) {
        delete data[id];
    }
    return data;
})