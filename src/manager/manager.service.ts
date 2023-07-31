import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from "../entities/manager.entity";
import { ManagerDto } from "../dtos/manager.dto";
import { Admin } from "src/entities/admin.entity";
import { ManagerUpdateDto } from "src/dtos/manager-update.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
import * as bcrypt from 'bcrypt';


@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager)
        private managerRepo: Repository<Manager>,
        private mailerService: MailerService
     ) {}
    
    async manager_profie(email): Promise<any>
    {
        const data = await this.managerRepo.findOne({ where: { email } });
        if (data !== null)
        {
            const { id, ...filteredData } = data;
            return filteredData;
        }
        else
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

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

    updateManager(name, email): any
    {
        return this.managerRepo.update({ email:email },{ name:name });
    }

    updateManagerbyId(mydto: ManagerUpdateDto, id): any
    {
        return this.managerRepo.update(id, mydto);
    }

    deleteManagerbyId(id): any
    {
        return this.managerRepo.delete(id);
    }
        
    getAdminByManagerID(id): any {
        return this.managerRepo.find({ 
            where: { id: id },
            relations: {
                admin: true,
            },
        });
    }

    async signup(mydto)
    {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(mydto.password, salt);
        mydto.password = hashedPassword;

        const existingManager = await this.managerRepo.findOne({ where: { name: mydto.name } });
        const existingManagerEmail = await this.managerRepo.findOne({ where: { email: mydto.email } });

        if (mydto.name === '')
        {
            throw new HttpException({ message: "Please provide the username" }, HttpStatus.BAD_REQUEST);
        } 
        else if (mydto.address === '')
        {
            throw new HttpException({ message: "Please provide the address" }, HttpStatus.BAD_REQUEST);
        }
        else if (existingManager)
        {
            throw new HttpException({ message: "Username already exists" }, HttpStatus.BAD_REQUEST);
        }
        else if(existingManagerEmail)
        {
            throw new HttpException({ message: "Email already exists" }, HttpStatus.BAD_REQUEST);
        }
        else 
        {
            await this.managerRepo.save(mydto);
            throw new HttpException('Registration Successful', HttpStatus.OK);
        }
    }

    async signin(mydto)
    {
        if (mydto.email != null && mydto.password != null)
        {
            const mydata = await this.managerRepo.findOneBy({ email: mydto.email });
            if (!mydata)
            {
                throw new UnauthorizedException({ message: "Email didn't match" });
            }
            const isMatch = await bcrypt.compare(mydto.password, mydata.password);
            if (isMatch)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            throw new UnauthorizedException({ message: "invalid credentials" });
        }
    }

    async Email(mydata)
    {
        return  await this.mailerService.sendMail({
            to: mydata.email,
            subject: mydata.subject,
            text: mydata.text, 
        });
    }
}