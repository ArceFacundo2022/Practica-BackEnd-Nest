import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private products: {id: number; name: string; precio: number; stock: number} [] = [{
    id: 1,
    name: "Ravioles",
    precio: 500,
    stock: 4
  },{
    id: 2,
    name: "Ñoquis",
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
  getProduct(@Param('id') id : number): any {
    let product = ""
    this.products.map((prod)=>{
      if(prod.id == id){
         product = prod.name
      }
    });
    return product
  }

  @Post(`/Product`)
  postProduct(@Body() datos: any): any {
    return this.products.push(datos)
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
}
