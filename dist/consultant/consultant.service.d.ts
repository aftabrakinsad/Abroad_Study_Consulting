import { MailerService } from '@nestjs-modules/mailer/dist';
import { ConsultantDto } from 'src/dtos/Consultant.dto';
import { CounsultantUpdateDto } from 'src/dtos/consultant-update.dtp';
import { Consultant } from 'src/entities/consultant.entity';
import { Repository } from 'typeorm';
export declare class ConsultantService {
    private consultantRepo;
    private mailerService;
    constructor(consultantRepo: Repository<Consultant>, mailerService: MailerService);
    getTotalConsultants(): Promise<number>;
    con_profie(email: any): Promise<any>;
    updateConsultant(name: any, email: any): any;
    updateConsultantbyid(mydto: CounsultantUpdateDto, id: any): any;
    deleteConsultantId(id: any): any;
    addConsultant(consultantDto: ConsultantDto): any;
    signup(mydto: any): Promise<void>;
    Email(mydata: any): Promise<SentMessageInfo>;
}
