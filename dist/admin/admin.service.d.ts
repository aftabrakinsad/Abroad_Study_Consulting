import { Repository } from 'typeorm';
import { Admin } from "../entities/admin.entity";
import { AdminUpdateDto } from "./admin-update.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
export declare class AdminService {
    private adminRepo;
    private mailerService;
    constructor(adminRepo: Repository<Admin>, mailerService: MailerService);
    getIndex(): any;
    myprofie(email: any): Promise<any>;
    getAdminById(id: any): Promise<{
        username: string;
        email: string;
        address: string;
        managers: import("../entities/manager.entity").Manager[];
    }>;
    addAdmin(mydto: any): Promise<any>;
    updateAdmin(username: any, email: any): any;
    updateAdminbyId(mydto: AdminUpdateDto, id: any): any;
    deleteAdminbyId(id: any): any;
    ManagersByAdminId(id: any): any;
    signup(mydto: any): Promise<void>;
    signin(mydto: any): Promise<boolean>;
    Email(mydata: any): Promise<SentMessageInfo>;
}
