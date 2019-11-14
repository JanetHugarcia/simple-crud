const Hapi = require('@hapi/hapi');

// const path = require('path');
// const pathData = path.join(__dirname, '/data');

const data = require('../data');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/products',
        handler: (req, h) => {
            console.log(data)
            return data;
        }
    });

    server.route({
        method: 'GET',
        path: '/products/{id}',
        handler: (req, h) => {
            const id = parseInt(req.params.id);
            return data[id];
        }
    });

    server.route({
        method: 'POST',
        path: '/products',
        handler: (req, h) => {
            const newProduct = req.payload;
            const id = newProduct.id;
            if (!data[id]) {
                data[id] = newProduct;
            }
            return data;
        }
    });

    server.route({
        method: 'PUT',
        path: '/products',
        handler: (req, h) => {
            const newProduct = req.payload;
            const id = newProduct.id;
            if (data[id]) {
                data[id] = newProduct;
            }
            return data;
        }
    });

    server.route({
        method: 'DELETE',
        path: '/products/{id}',
        handler: (req, h) => {
            const id = req.params.id;
            if (data[id]) {
                delete data[id]
            }
            return data;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();