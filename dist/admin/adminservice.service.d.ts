import { Repository } from 'typeorm';
import { AdminEntity } from "./adminentity.entity";
import { AdminFormUpdate } from "./adminformupdate.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
export declare class AdminService {
    private adminRepo;
    private mailerService;
    constructor(adminRepo: Repository<AdminEntity>, mailerService: MailerService);
    getIndex(): any;
    getUserByID(id: any): Promise<AdminEntity>;
    getUserByIDName(qry: any): any;
    insertUser(mydto: any): Promise<any>;
    updateUser(name: any, email: any): any;
    updateUserbyid(mydto: AdminFormUpdate, id: any): any;
    deleteUserbyid(id: any): any;
    getManagersByAdminID(id: any): any;
    signup(mydto: any): Promise<any>;
    signin(mydto: any): Promise<boolean>;
    sendEmail(mydata: any): Promise<SentMessageInfo>;
}
