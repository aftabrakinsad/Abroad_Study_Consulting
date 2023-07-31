import { Repository } from 'typeorm';
import { Manager } from "../entities/manager.entity";
import { ManagerDto } from "../dtos/manager.dto";
import { ManagerUpdateDto } from "src/dtos/manager-update.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
export declare class ManagerService {
    private managerRepo;
    private mailerService;
    constructor(managerRepo: Repository<Manager>, mailerService: MailerService);
    manager_profie(email: any): Promise<any>;
    addManager(managerDto: ManagerDto, adminId: number): Promise<Manager>;
    updateManager(name: any, email: any): any;
    updateManagerbyId(mydto: ManagerUpdateDto, id: any): any;
    deleteManagerbyId(id: any): any;
    getAdminByManagerID(id: any): any;
    signup(mydto: any): Promise<void>;
    signin(mydto: any): Promise<boolean>;
    Email(mydata: any): Promise<SentMessageInfo>;
}
