## Contexto
Creación de un simple CRUD con Hapi, Adonis y Express;
### CRUD con Hapi
- Para el Server: 
    - Para crear el server sólo instalas el paquete npm de Hapi y lo llamas en tu archivo.

    ```js
    const Hapi = require('@hapi/hapi');
    ```

    - Con la api *server* te pide pasar por parámetro un objeto especificando el nro de puerto y el host.

    ```js
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    ...
    server.start();
    //Tu servidor está escuchando el puerto 3000
    ```
- Para los Routes:
    - Para las rutas hacemos uso de la api *route* que también require pasarle por parámetro por objeto especificando method, path y handler, en el cual retornamos la data que queremos mostrar.
    ```js
    server.route({
        method: 'GET',
        path: '/products',
        handler: (req, h) => {
            console.log(data)
            return data;
        }
    });
    ```
    - Para listar productos por 'id', el id tenemos que pasarlo por parámetro en el path. Hapi reconoce al id cómo parámetro si lo defines entre llaves '{}'
    ```js
    path: '/products/{id}',
    //Para acceder al id, accedemos al req.params
    const id = parseInt(req.params.id);
    ```
    - Al implementar el verbo POST, necesitaremos el 'req.payload' para leer los datos del body
    ```js
    const newProduct = req.payload;
    ```
### CRUD con Adonis
- Para el server:
    - Sólo es necesario correr un comando!
    ```js
    adonis serve --dev
    ```
    - Adonis nos provee una cli que nos crea un proyecto estructurado, con su propio node-modules dentro. Configuraciones setteadas, templates hechos.
    ```js
    npm i -g @adonisjs/cli
    adonis new adonis
    cd adonis
    adonis serve --dev
    //No configuré nada, sigue esos pasos y tendrás ya un servidor escuchando
    ```
- Para los routes:
    - Según la estructura que Adonis nos crea, debes ponerla en  'start/routes.js' Tenemos una variable Route ya definida, el cual nos provee de apis con los verbos que ya conocemos, a los cuales se le pasa 2 parámetros: el path y un handler. Y si quieres mostrar data, solo la retornas.
    ```js
    Route.get('/products', ({ request, response, view }) => {
        return data;
    })
    ```
    - Para mandar datos en el path, Adonis trabaja como Express. Por ejemmplo para le id, sería ':id'. Y para leerlo debemos llamar a 'params' dentro del handler.
    ```js
    Route.get('/products/:id', ({ params }) => {
        const id = params.id;
        //code
    })
    ```
    - Para reconocer los datos del body debemos llamar al 'request.post()'
    nota: para que trabaje debemos deshabilitar el csrf que está en 'config/shield.js', al parecer está relacionado con temas de seguridad y tokens
    ```js
    Route.post('/products', ({ request }) => {
        const newProduct = request.post();
        //code
    })
    ```

### CRUD con Express
- Para el server:
    - Para crear el servidor importas express desde npm y lo instancias. 
    ```js
    const express = require('express');

    const app = express();
    ```
    - Con la api de 'listen' setteas el puerto y levantas el servidor.
    ```js
    const PORT = 3000;

    app.listen(PORT, () => {
        console.log('Server is running on port 3000');
    })
    ```
- Para el routes:
    - Express nos provee apis con los mismos nombres de los verbos, a los cuales les pasaremos por parámetro el path y un handler. Solo retornas tu data.
    ```js
    app.get('/products', (req, res) => {
        res.send(data);
    })
    ```
    - Para definir el id como parámetro dentro del path, usamos :id y para trabajarlo en el handler, lo encontraremos dentro del req.params
    ```js
    app.get('/products/:id', (req, res) => {
        const id = req.params.id;
        //code
    })
    ```
    - Para poder trabajar con data que proviene del body, usamos req.body
    nota: Express te pide settear un Middleware para poder leer el req.body
    ```js
    //middleware
    app.use(express.json())

    app.post('/products', (req, res, next) => {
        const newProduct = req.body;
        //code
    })
    ```
## Conclusiones
### Adonis
- La cli de Adonis nos crea un proyecto con una arquitectura y muchas configuraciones definidas. 
- El levantar un servidor corriendo un solo comando es tentador, pero a la hora de hacer el debugging, hacer console.log no es suficiente.
- Para realizar un simple CRUD, Adonis provee de muchas configuraciones. Pero sí, es rápido.

### Hapi
- Hapi nos provee una sintaxis diferente a la de Adonis y Express, pasarle objetos de configuración como parámetros, le da un peso ligero y fresco a la hora de codear. Si bien, requiere más pasos que Adonis, es más ligero que Adonis mismo y Express a la hora de codear.

### Express
- Adonis y Express tienen una sintaxis marcada a la hora de settear rutas y trabajar con los verbos. Me parece que Hapi es más sencillo pero que Express, sería ideal para aprender conceptos generales, que ayudarían a entender otras tecnologías.
s
#### Disclaimer
- Todo lo escrito aquí es en base a la hora de hacer un simple CRUD con Nodejs. A medida que crezcan los proyectos las valoraciones pueden variar.