import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // @UseGuards(LocalAuthGuard)
  @Get('all')
  @UseGuards(AuthGuard())
  async all() {
    console.log('all');
    return this.productService.all();
  }

  @EventPattern({cmd: 'product_created'})
  async createProduct(product: any) {
    return await this.productService.createProd(product);
  }

  @EventPattern('products_updated')
  async updateProduct(product: any) {
    console.log(product, 'product updated')
    return await this.productService.updateProd(product.id, product)
  }

  @EventPattern('products_deleted')
  async updateDeleted(id: number) {
    console.log(id, 'deleted');
    return await this.productService.deleteProduct(id)
  }
}
