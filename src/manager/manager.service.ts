import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from "../entities/manager.entity";
import { ManagerDto } from "../dtos/manager.dto";
import { Admin } from "src/entities/admin.entity";


@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager)
        private managerRepo: Repository<Manager>,
     ) {}


// addManager(mydto: ManagerDto): any 
// {    
//    return this.managerRepo.save(mydto);
// }

async addManager(managerDto: ManagerDto, adminId: number): Promise<Manager> {
        const newManager = new Manager();
        newManager.name = managerDto.name;
        newManager.email = managerDto.email;
        newManager.password = managerDto.password;
        newManager.address = managerDto.address;

        const admin = new Admin();
        admin.id = adminId;
        newManager.admin = admin;

        return this.managerRepo.save(newManager);
    }
      
getAdminByManagerID(id): any {
    return this.managerRepo.find({ 
            where: { id: id },
            relations: {
                admin: true,
            },
        });
    }
}