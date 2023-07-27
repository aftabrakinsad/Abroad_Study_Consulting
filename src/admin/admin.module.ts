import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./admin.service"
import { Admin } from "../entities/admin.entity"
import { ManagerService } from "src/manager/manager.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { Manager } from "src/entities/manager.entity";

@Module({
imports: [
    MailerModule.forRoot({
        transport: {
        host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
                user: 'rakinsadaftab@gmail.com',
                pass: ''
            },
        }
    }),
      
    TypeOrmModule.forFeature([Admin, Manager]),
],
    controllers: [AdminController],
    providers: [AdminService, ManagerService],
})

export class AdminModule {}