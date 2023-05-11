import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { LocalStrategy } from 'src/auth/local.strategy';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './product.models';
import { ProductService } from './product.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
