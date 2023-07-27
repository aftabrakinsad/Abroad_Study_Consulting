import { Repository } from 'typeorm';
import { Manager } from "../entities/manager.entity";
import { ManagerDto } from "../dtos/manager.dto";
export declare class ManagerService {
    private managerRepo;
    constructor(managerRepo: Repository<Manager>);
    addManager(managerDto: ManagerDto, adminId: number): Promise<Manager>;
    getAdminByManagerID(id: any): any;
}
