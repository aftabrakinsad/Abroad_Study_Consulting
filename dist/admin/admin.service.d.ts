import { Repository } from 'typeorm';
import { Admin } from "../entities/admin.entity";
import { AdminUpdateDto } from "../dtos/admin-update.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
export declare class AdminService {
    private adminRepo;
    private mailerService;
    constructor(adminRepo: Repository<Admin>, mailerService: MailerService);
    getIndex(): any;
    getTotalAdmins(): any;
    myprofie(email: any): Promise<any>;
    getAdminById(id: any): Promise<{
        username: string;
        email: string;
        address: string;
    }>;
    getAdminByName(username: any): Promise<{
        username: string;
        email: string;
        address: string;
    }>;
    getAdminByEmail(email: any): Promise<{
        username: string;
        email: string;
        address: string;
    }>;
    addAdmin(mydto: any): Promise<void>;
    updateAdmin(mydto: any): Promise<void>;
    updateAdminbyId(mydto: AdminUpdateDto, id: any): any;
    deleteAdminbyId(id: any): any;
    signup(mydto: any): Promise<void>;
    signin(mydto: any): Promise<boolean>;
    sendEmail(mydata: any): Promise<SentMessageInfo>;
}
