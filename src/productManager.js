
import {saveArchive, readArchive} from "./fileSystemManager.js"
//Desafio entregable 1

class ProductManager {
    static idCounter = 0;
    static productProperties = ["title", "description", "price", "thumbnail", "code", "stock"]
    constructor(path){
        this.path = path
        this.products = []
    }

    updateProduct = async (productToUpdate) =>{
        const indice = this.products.findIndex(product => Number(product.id) === Number(productToUpdate.id))
        if(indice === -1){
            return {"error": "The product´s id provided incorrect"}
        }else{
            if(this.hasAllProperties(productToUpdate)){
                this.products[indice] =  productToUpdate
                await saveArchive(this.path, this.products)
                return this.products
            }else{
                return {"error": `Error: the product must have ${ProductManager.productProperties.join(", ")}`}
            }
            
        }
    }
    hasAllProperties = (productToCheck) =>{
        const results = []
        for(const property of ProductManager.productProperties){
            results.push(Object.keys(productToCheck).includes(property))
        }
        return results.every(result => result)
    }
    addProduct = async (productToAdd) => {
        
        if(this.hasAllProperties(productToAdd)){
            if(!this.products.some(product => product.code === productToAdd.code)){
                this.products.push({...productToAdd, id: ProductManager.idCounter++})
                await saveArchive(this.path, this.products)
                return await readArchive(this.path).then(res => res)
            }else{
                return "Error: you cannot repeat the code field"
            }
        }else{
            return `Error: the product must have ${ProductManager.productProperties.join(", ")}`
        }
        
    }
    
    getProducts = async (limit) =>{
        return await readArchive(this.path)
        .then(res => {
            if(limit){
                return res.slice(0, limit)
            }else{
                return res
            }
        })
    } 

    getProductsById = async (id) => {
        return await this.getProducts()
        .then(products => products.find(product => Number(product.id) === Number(id)))
        .then(product => {
            if(product){
                return {ok: true, content: product}
            }else{
                return {ok: false, content: "Product not found"}
            }
        } )
    }
    deleteById = async (id) =>{
        this.products = this.products.filter(product => Number(product.id) !== Number(id))
        await saveArchive(this.path,this.products)
        return this.product
    }
}
const manager = new ProductManager("./src/db/products.json")

/* manager.addProduct({title: "manzana",description: "lorem ipsum dolor", price: 1223, thumbnail: "...", stock: 4, code: "AA01"}).then(res => console.log(res))
manager.addProduct({title: "manzana",description: "lorem ipsum dolor", price: 1223, thumbnail: "...", stock: 4, code: "AA01"}).then(res => console.log(res))
manager.addProduct({title: "manzana",description: "lorem ipsum dolor", price: 1223, thumbnail: "...", stock: 4, code: "AA03"}).then(res => console.log(res))
manager.addProduct({title: "manzana",description: "lorem ipsum dolor", price: 1223, thumbnail: "...", stock: 4, code: "AA04"}).then(res => console.log(res))
manager.addProduct({title: "banana",description: "lorem ipsum dolor", price: 1222, thumbnail: "...", stock: 23, code: "AA02"}).then(res => console.log(res))
manager.addProduct({title: "banana", price: 1222, thumbnail: "...", stock: 23, code: "AA02"}).then(res => console.log(res)) */

export { manager }

