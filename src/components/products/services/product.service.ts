import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {
  }

  public async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(createProductDto);
  }

  public async getProduct(productId: number): Promise<Product> {
    return await this.productRepository.findOne(productId);
  }

  public async updateProduct(
    productId: number,
    createProductDto: CreateProductDto): Promise<any> {
      return await this.productRepository.update(productId, createProductDto);
  }

  public async deleteProduct(productId: number): Promise<any> {
    return await this.productRepository.delete(productId);
  }
}
