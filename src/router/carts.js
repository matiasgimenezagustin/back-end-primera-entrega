import express from "express"
import {cartsManager} from "../cartsManager.js"
import { manager } from "../productManager.js"

export const routerCarts = express.Router()


routerCarts.post("/", async (req, res) =>{
    res.status(200).json({status: 200, ok: true, content: await cartsManager.createCart()})
})

routerCarts.post("/:cid/product/:pid", async (req, res) =>{
    const {cid, pid} = req.params
    const response = await cartsManager.addProductToCart(cid, pid)
    console.log(response)
    if(response.ok){

    }else{
        res.status(404).json({...response, status: 404})
    }
})