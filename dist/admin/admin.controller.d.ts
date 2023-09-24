import { ManagerService } from 'src/manager/manager.service';
import { AdminUpdateDto } from '../dtos/admin-update.dto';
import { AdminService } from './admin.service';
import { AdminDto } from '../dtos/admin.dto';
import { ManagerDto } from 'src/dtos/manager.dto';
import { ConsultantDto } from 'src/dtos/Consultant.dto';
import { ConsultantService } from 'src/consultant/consultant.service';
import { ManagerUpdateDto } from 'src/dtos/manager-update.dto';
import { CounsultantUpdateDto } from 'src/dtos/consultant-update.dtp';
export declare class AdminController {
    private adminService;
    private managerService;
    private consultantService;
    constructor(adminService: AdminService, managerService: ManagerService, consultantService: ConsultantService);
    getAdmin(): any;
    getManagers(): any;
    getConsultants(): any;
    getAdminStatistics(): any;
    getManagerStatistics(): any;
    getConsultantStatistics(): any;
    getProfile(session: any): any;
    getAdminByID(id: number): any;
    getConsultantByID(id: number): any;
    getManagerByID(id: number): any;
    getAdminByName(username: string): any;
    getAdminByEmail(email: string): any;
    updateAdmin(adminDto: AdminDto): Promise<any>;
    updateManager(session: any, name: string): any;
    updateConsultant(session: any, name: string): any;
    updateAdminbyid(mydto: AdminUpdateDto, id: number): any;
    updateManagerbyid(mydto: ManagerUpdateDto, id: number): any;
    updateConsultantbyid(mydto: CounsultantUpdateDto, id: number): any;
    deleteAdminbyId(id: number): any;
    deleteManagerId(id: number): any;
    deleteConsultantId(id: number): any;
    addAdmin(admindto: AdminDto): Promise<any>;
    addManager(managerDto: ManagerDto): Promise<any>;
    addConsultant(consultantDto: ConsultantDto): Promise<any>;
    signup(mydto: AdminDto): Promise<any>;
    signin(session: any, mydto: AdminDto): Promise<void>;
    signout(req: any): {
        message: string;
    };
    sendEmail(mydata: any): Promise<{
        message: string;
        result: SentMessageInfo;
        error?: undefined;
    } | {
        message: string;
        error: any;
        result?: undefined;
    }>;
}
