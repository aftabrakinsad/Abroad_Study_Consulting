import { Repository } from 'typeorm';
import { Admin } from "./admin.entity";
import { AdminUpdateDto } from "./admin-update.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
export declare class AdminService {
    private adminRepo;
    private mailerService;
    constructor(adminRepo: Repository<Admin>, mailerService: MailerService);
    getIndex(): any;
    getAdminById(id: any): Promise<Admin>;
    addAdmin(mydto: any): Promise<any>;
    updateAdmin(name: any, email: any): any;
    updateAdminbyId(mydto: AdminUpdateDto, id: any): any;
    deleteAdminbyId(id: any): any;
    ManagersByAdminId(id: any): any;
    signup(mydto: any): Promise<void>;
    signin(mydto: any): Promise<boolean>;
    Email(mydata: any): Promise<SentMessageInfo>;
}
