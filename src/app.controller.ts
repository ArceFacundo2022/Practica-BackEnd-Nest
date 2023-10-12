import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private products: {id: number; name: string; precio: number; stock: number} [] = [{
    id: 1,
    name: "Papas Fritas",
    precio: 350,
    stock: 4
  },{
    id: 2,
    name: "Azucar",
    precio: 500,
    stock: 6
  },{
    id: 3,
    name: "Tomates",
    precio: 200,
    stock: 10
  }]

  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`/Product/:id`)
  getProductId(@Param('id') id : number): any {
    let resp = ""
    this.products.map((prod)=>{
      if(prod.id == id){
        resp = prod.name
      }
    });
    return resp
  }

  @Get(`/Product`)
  getProduct():any{
    return this.products
  }

  @Post(`/Product`)
  postProduct(@Body() datos: any): any {

    let resp = false
    this.products.map((prod)=> {
      if(prod.id == datos.id || prod.name == datos.name){
        prod.stock += datos.stock
        resp = true
      }
      return prod
    })
    if(!resp){
      this.products.push(datos)
    }
    return this.products
  }

  @Put(`/Product`)
  putProduct(@Body() datos: any): any{
    const newProductos = this.products.map((prod)=>{
      if(prod.id == datos.id){
        prod = datos
      }
      return prod
    })
    this.products = newProductos
    return this.products
  }

  @Delete(`/ProductSubtract/:id`)
  sustraerProduct(@Param('id') id : number): any{
    let resp = ""
    this.products.map((prod)=>{
      if(prod.id == id){
        if(prod.stock > 0){
          resp = `Hay ${prod.stock --} ${prod.name} en el almacenamiento`
        }else{
          resp = `No hay mas ${prod.name} en el alamacenamiento para sustraer`
        }
      }
    });
    return resp 
  }

  @Delete(`/Product/:id`)
  deleteProduct(@Param('id') id : number): any{
    let resp = this.products.map((prod, index)=>{
        if(prod.id == id){
          this.products.splice(index,1)
        }else{
          return prod
        }
      });
    return resp 
  }
}
