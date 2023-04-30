import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.models';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ) {}

  async all() {
    return this.productModel.find().exec();
  }

  async createProd(product: any): Promise<Product> {
    console.log(product);
    return new this.productModel(product).save();
  }

  async updateProd(id: number, product: Product): Promise<any> {
    return this.productModel.findOneAndUpdate({id}, product)
  }

  async findProduct(id: number): Promise<Product> {
    return await this.productModel.findOne({ id });
  }

  async deleteProduct(id: number): Promise<any> {
    return this.productModel.deleteOne({id})
  }
}
