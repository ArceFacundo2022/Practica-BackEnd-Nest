import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! (Desde el puerto 3000)';
  }

  getRick(): string {
    return `<h1>Hola locos</h1>`;
  }

  postProduct(body: any): any {
    return body;
  }
}
