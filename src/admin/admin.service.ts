import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from "./admin.entity";
import { AdminUpdateDto } from "./admin-update.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepo: Repository<Admin>,
        private mailerService: MailerService  
    ) {}

    getIndex(): any { 
        return this.adminRepo.find();
    }

    async getAdminById(id)
    {
        const data = await this.adminRepo.findOneBy({ id });
        // console.log(data);
        if(data !== null) {
            return data;
        }
        else 
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    async addAdmin(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.adminRepo.save(mydto);
    }

    updateAdmin(name, email): any
    {
    return this.adminRepo.update({ email:email },{ name:name });
    }

    updateAdminbyId(mydto: AdminUpdateDto, id): any
    {
        return this.adminRepo.update(id, mydto);
    }

    deleteAdminbyId(id): any
    {
        return this.adminRepo.delete(id);
    }
        
    ManagersByAdminId(id): any
    {
        return this.adminRepo.find({ 
            where: {id:id},
            relations: {
                managers: true,
            },
        });
    }

    async signup(mydto)
    {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(mydto.password, salt);
        mydto.password = hashedPassword;

        const existingAdmin = await this.adminRepo.findOne({ where: { name: mydto.name } });
        const existingAdminEmail = await this.adminRepo.findOne({ where: { email: mydto.email } });

        if (mydto.name === '')
        {
            throw new HttpException({ message: "Please provide the username" }, HttpStatus.BAD_REQUEST);
        } 
        else if (mydto.address === '')
        {
            throw new HttpException({ message: "Please provide the address" }, HttpStatus.BAD_REQUEST);
        }
        else if (existingAdmin)
        {
            throw new HttpException({ message: "Username already exists" }, HttpStatus.BAD_REQUEST);
        }
        else if(existingAdminEmail)
        {
            throw new HttpException({ message: "Email already exists" }, HttpStatus.BAD_REQUEST);
        }
        else 
        {
            await this.adminRepo.save(mydto);
            throw new HttpException('Registration Successful', HttpStatus.OK);
        }
    }


    async signin(mydto)
    {
        if (mydto.email != null && mydto.password != null)
        {
            const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
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
            return false;
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