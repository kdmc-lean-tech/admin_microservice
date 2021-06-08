import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://kfbrawgc:0fCr8ukefFN_v7f1OKNLaWsb7m0OcCqL@shrimp.rmq.cloudamqp.com/kfbrawgc'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  providers: [
    ProductService
  ],
  controllers: [
    ProductController
  ]
})
export class ProductsModule {}
