import { Repository } from 'typeorm';
import { AdminEntity } from "./adminentity.entity";
import { AdminFormUpdate } from "./adminformupdate.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
export declare class AdminService {
    private adminRepo;
    private mailerService;
    constructor(adminRepo: Repository<AdminEntity>, mailerService: MailerService);
    getIndex(): any;
    getAdminById(id: any): Promise<AdminEntity>;
    addAdmin(mydto: any): Promise<any>;
    updateAdmin(name: any, email: any): any;
    updateAdminbyId(mydto: AdminFormUpdate, id: any): any;
    deleteAdminbyId(id: any): any;
    ManagersByAdminId(id: any): any;
    signup(mydto: any): Promise<any>;
    signin(mydto: any): Promise<boolean>;
    Email(mydata: any): Promise<SentMessageInfo>;
}
