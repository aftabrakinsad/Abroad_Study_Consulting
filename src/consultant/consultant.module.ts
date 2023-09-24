import { Module } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { Consultant } from 'src/entities/consultant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

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
    TypeOrmModule.forFeature([Consultant])
  ],
  controllers: [],
  providers: [ConsultantService]
})
export class ConsultantModule {}