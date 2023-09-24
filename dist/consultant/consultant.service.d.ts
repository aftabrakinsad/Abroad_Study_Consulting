import { MailerService } from '@nestjs-modules/mailer/dist';
import { Consultant } from 'src/entities/consultant.entity';
import { Repository } from 'typeorm';
export declare class ConsultantService {
    private consultantRepo;
    private mailerService;
    constructor(consultantRepo: Repository<Consultant>, mailerService: MailerService);
    getConsultants(): any;
    getTotalConsultants(): Promise<number>;
    con_profie(email: any): Promise<any>;
    updateConsultant(name: any, email: any): any;
    updateConsultantbyid(mydto: any, id: any): Promise<void>;
    deleteConsultantId(id: any): any;
    addConsultant(mydto: any): Promise<void>;
    getConsultantById(id: any): Promise<{
        name: string;
        phone: string;
        email: string;
        country: string;
    }>;
    signup(mydto: any): Promise<void>;
    Email(mydata: any): Promise<SentMessageInfo>;
}
