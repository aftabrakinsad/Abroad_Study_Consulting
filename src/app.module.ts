import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConsultantController } from './consultant/consultant.controller';
import { ConsultantModule } from './consultant/consultant.module';

@Module({
  imports: [AdminModule, ManagerModule, ConsultantModule,TypeOrmModule.forRoot(
   { 
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'heil',
    database: 'APWTDB',
    autoLoadEntities: true,
    synchronize: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '../public'), // added ../ to get one folder back
    serveRoot: '/public/' //last slash was important
  }),
  ConsultantModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}