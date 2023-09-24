import { Repository } from 'typeorm';
import { Manager } from "../entities/manager.entity";
import { ManagerUpdateDto } from "src/dtos/manager-update.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
export declare class ManagerService {
    private managerRepo;
    private mailerService;
    constructor(managerRepo: Repository<Manager>, mailerService: MailerService);
    getManagers(): any;
    getManagerById(id: any): Promise<{
        name: string;
        email: string;
        address: string;
    }>;
    manager_profie(email: any): Promise<any>;
    getTotalManagers(): Promise<number>;
    addManager(mydto: any): Promise<void>;
    updateManager(name: any, email: any): any;
    updateManagerbyId(mydto: ManagerUpdateDto, id: any): any;
    deleteManagerbyId(id: any): any;
    signup(mydto: any): Promise<void>;
    signin(mydto: any): Promise<boolean>;
    Email(mydata: any): Promise<SentMessageInfo>;
}
