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

  async create(product: any): Promise<Product> {
    return new this.productModel(product);
  }
}
