import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './components/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kokoaWIZNETw51001945-',
      database: 'admin-micro',
      autoLoadEntities: true,
      synchronize: true
  })),
  ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
