import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./admin.service"
import { Admin } from "./admin.entity"
import { ManagerService } from "src/manager/manager.service";
import { ManagerEntity } from "src/manager/manager.entity";
import { MailerModule } from "@nestjs-modules/mailer";

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
      
    TypeOrmModule.forFeature([Admin, ManagerEntity]),
],
    controllers: [AdminController],
    providers: [AdminService, ManagerService],
})

export class AdminModule {}