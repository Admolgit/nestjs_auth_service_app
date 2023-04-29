import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(LocalAuthGuard)
  @Get('all')
  async all() {
    console.log('all');
    return this.productService.all();
  }

  @MessagePattern('product_created')
  @Post()
  async create(product: any) {
    console.log('create', product);
    await this.productService.create({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity
    });

  }
}
