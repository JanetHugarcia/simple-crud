const express = require('express');
const data = require('../data');

const app = express();

const PORT = 3000;

//middleware
app.use(express.json()) 

//routes
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/products', (req, res) => {
    res.send(data);
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    res.send(data[id]);
})

app.post('/products', (req, res, next) => {
    const newProduct = req.body;
    const id = req.body.id;
    if (!data[id]) {
        data[id] = newProduct;
    }
    res.send(data);
})

app.put('/products', (req, res, next) => {
    const newProduct = req.body;
    const id = req.body.id;
    if (data[id]) {
        data[id] = newProduct;
    }
    res.send(data);
})

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    if (data[id]) {
        delete data[id];
    }
    res.send(data);
})

//listener
app.listen(PORT, () => {
     console.log('Server is running on port 3000');
})