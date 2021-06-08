import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
  ) {
  }

  @Get()
  public async getProducts() {
    return this.client.send('GET_PRODUCTS', {});
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createProduct(@Body() createProductDto: CreateProductDto) {
    const product: Product = await this.productService.createProduct(createProductDto);
    this.client.emit('PRODUCT_CREATED', product);
    return product;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  public async updateProduct(
    @Body() createProductDto: CreateProductDto,
    @Param('id', ParseIntPipe) productId: number
    ) {
      await this.productService.updateProduct(productId, createProductDto);
      const product: Product = await this.productService.getProduct(productId);
      this.client.emit('PRODUCT_UPDATED', product);
      return product;
  }

  @Delete(':id')
  public async deleteProduct(@Param('id', ParseIntPipe) productId: number) {
    const result = await this.productService.deleteProduct(productId);
    this.client.emit('PRODUCT_DELETED', productId);
    return result;
  }
}
