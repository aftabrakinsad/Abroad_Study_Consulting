import { ManagerService } from './manager.service';
import { ManagerDto } from 'src/dtos/manager.dto';
export declare class ManagerController {
    private managerService;
    constructor(managerService: ManagerService);
    getProfile(session: any): any;
    signup(mydto: ManagerDto): Promise<any>;
    signin(session: any, mydto: ManagerDto): Promise<void>;
    signout(session: any): {
        message: string;
    };
    sendEmail(mydata: any): Promise<SentMessageInfo>;
}
