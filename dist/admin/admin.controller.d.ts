import { ManagerService } from 'src/manager/manager.service';
import { AdminUpdateDto } from './admin-update.dto';
import { AdminService } from './admin.service';
import { AdminDto } from '../dtos/admin.dto';
import { ManagerDto } from 'src/dtos/manager.dto';
export declare class AdminController {
    private adminService;
    private managerService;
    constructor(adminService: AdminService, managerService: ManagerService);
    getAdmin(): any;
    getProfile(session: any): any;
    getAdminByID(id: number): any;
    addAdmin(mydto: AdminDto): Promise<any>;
    updateAdmin(session: any, name: string): any;
    updateAdminbyid(mydto: AdminUpdateDto, id: number): any;
    deleteAdminbyId(id: number): any;
    addManager(managerDto: ManagerDto, adminDto: AdminDto): Promise<any>;
    getManagerByAdminId(id: number): any;
    getAdminByManagerId(id: number): any;
    signup(mydto: AdminDto): Promise<any>;
    signin(session: any, mydto: AdminDto): Promise<void>;
    signout(session: any): {
        message: string;
    };
    sendEmail(mydata: any): Promise<SentMessageInfo>;
}
