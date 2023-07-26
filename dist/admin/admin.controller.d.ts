import { ManagerForm } from 'src/manager/manager.dto';
import { ManagerService } from 'src/manager/manager.service';
import { AdminForm } from './adminform.dto';
import { AdminFormUpdate } from './adminformupdate.dto';
import { AdminService } from './adminservice.service';
export declare class AdminController {
    private adminService;
    private managerService;
    constructor(adminService: AdminService, managerService: ManagerService);
    gethellow(): any;
    getAdmin(): any;
    getAdminByID(id: number): any;
    getAdminByIDName(qry: any): any;
    insertAdmin(mydto: AdminForm): Promise<any>;
    updateAdmin(session: any, name: string): any;
    updateAdminbyid(mydto: AdminFormUpdate, id: number): any;
    deleteAdminbyid(id: number): any;
    insertManager(managerdto: ManagerForm): any;
    getManagerByAdminID(id: number): any;
    getAdminByManagerID(id: number): any;
    signup(mydto: AdminForm): Promise<any>;
    signin(session: any, mydto: AdminForm): Promise<any>;
    signout(session: any): {
        message: string;
    };
    sendEmail(mydata: any): Promise<SentMessageInfo>;
}
