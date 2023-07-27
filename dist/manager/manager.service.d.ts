import { Repository } from 'typeorm';
import { ManagerForm } from "./manager.dto";
import { ManagerEntity } from "./manager.entity";
export declare class ManagerService {
    private managerRepo;
    constructor(managerRepo: Repository<ManagerEntity>);
    addManager(mydto: ManagerForm): any;
    getAdminByManagerID(id: any): any;
}
