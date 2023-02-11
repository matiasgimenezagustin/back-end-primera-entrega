import  express  from "express";
import {manager} from "./productManager.js";

const app = express()
const PORT = 8080

app.listen(PORT, () => console.log(`EXITO: el servidor se esta escuchando en el puerto ${PORT}`))

app.get("/", (req, res) =>{
    res.json({
        status: 200,
        ok: true,
        content: "hola mundo"
    })
})

app.get("/products", (req, res) => {
    const {limit} = req.query
    manager.getProducts(limit)
    .then(( data )=> res.status(200).json({status: 200, ok: true, data}) )
    .catch((err) => res.status(400).json({status: 400, ok: false, error: err}))
})

app.get("/products/:pid", (req, res) =>{
    const {pid} = req.params
    if(pid && !isNaN(pid)){
        manager.getProductsById(pid).then(result => {
            if(result.ok){
                res.status(200).json({status: 200, ok: true, content: result.content})
            }else{
                res.status(404).json({status: 404, ok: false, content: result.content})
            }
        })
    }else if(isNaN(pid)){
        res.status(400).json({status: 400, ok: false, error: "Product ID given was not a number"})
    }else{
        res.status(401).json({status: 401, ok: false, error: "Product ID was not specified"})
    }
})


/* Consigna
Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
Aspectos a incluir

Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
Aspectos a incluir

El servidor debe contar con los siguientes endpoints:
ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
Si no se recibe query de límite, se devolverán todos los productos
Si se recibe un límite, sólo devolver el número de productos solicitados
ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
Sugerencias
Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets. 
Formato del entregable
Link al repositorio de Github con el proyecto completo, el cual debe incluir:
carpeta src con app.js dentro y tu ProductManager dentro.
package.json con la info del proyecto.
NO INCLUIR LOS node_modules generados.
 */