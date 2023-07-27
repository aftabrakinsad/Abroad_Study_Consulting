import { ManagerForm } from 'src/manager/manager.dto';
import { ManagerService } from 'src/manager/manager.service';
import { AdminUpdateDto } from './admin-update.dto';
import { AdminService } from './admin.service';
import { Admin } from './admin.dto';
export declare class AdminController {
    private adminService;
    private managerService;
    constructor(adminService: AdminService, managerService: ManagerService);
    getAdmin(): any;
    getAdminByID(id: number): any;
    addAdmin(mydto: Admin): Promise<any>;
    updateAdmin(session: any, name: string): any;
    updateAdminbyid(mydto: AdminUpdateDto, id: number): any;
    deleteAdminbyId(id: number): any;
    addManager(managerdto: ManagerForm): any;
    getManagerByAdminId(id: number): any;
    getAdminByManagerId(id: number): any;
    signup(mydto: Admin): Promise<void>;
    signin(session: any, mydto: Admin): Promise<any>;
    signout(session: any): {
        message: string;
    };
    sendEmail(mydata: any): Promise<SentMessageInfo>;
}
