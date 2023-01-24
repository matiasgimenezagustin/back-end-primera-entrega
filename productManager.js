

//Desafio entregable 1

class ProductManager {
    static idCounter = 0;
    static productProperties = ["title", "description", "price", "thumbnail", "code", "stock"]
    constructor(){
        this.products = []
    }

    addProduct = (productToAdd) => {
        let results = []
        for(const property of ProductManager.productProperties){
            results.push(Object.keys(productToAdd).includes(property))
        }
        if(results.every(result => result)){
            if(!this.products.some(product => product.code === productToAdd.code)){
                this.products.push({...productToAdd, id: ProductManager.idCounter++})
            }else{
                return "Error: you cannot repeat the code field"
            }
        }else{
            return `Error: the product must have ${ProductManager.productProperties.join(", ")}`
        }
        
    }
    
    getProducts = () => this.products

    getProductsById = (id) => {
        if(this.products.some(product => product.id === id)){
            return this.products.find(product => product.id === id )
        }else{
            return "Error: product not found"
        }
    }
}

const manager = new ProductManager()

console.log(manager.addProduct({title: "manzana",description: "lorem ipsum dolor", price: 1223, thumbnail: "...", stock: 4, code: "AA01"}))
console.log(manager.addProduct({title: "manzana",description: "lorem ipsum dolor", price: 1223, thumbnail: "...", stock: 4, code: "AA01"}))
console.log(manager.addProduct({title: "banana",description: "lorem ipsum dolor", price: 1222, thumbnail: "...", stock: 23, code: "AA02"}))
console.log(manager.addProduct({title: "banana", price: 1222, thumbnail: "...", stock: 23, code: "AA02"}))

//Tests 

console.log(manager.products)

console.log(manager.getProductsById(1))

console.log(manager.getProductsById(7))

console.log(manager.products)