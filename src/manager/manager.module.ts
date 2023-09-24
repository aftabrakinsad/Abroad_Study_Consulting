import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Manager } from "../entities/manager.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { ManagerService } from "./manager.service";

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
                pass: 'rvaxlwlwfhbztjbm',
            },
        }
    }),
        TypeOrmModule.forFeature([Manager])
    ],
    controllers: [],
    providers: [ManagerService],
})

export class ManagerModule {}