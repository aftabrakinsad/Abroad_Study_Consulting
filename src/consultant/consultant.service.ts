import { MailerService } from '@nestjs-modules/mailer/dist';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultantDto } from 'src/dtos/Consultant.dto';
import { CounsultantUpdateDto } from 'src/dtos/consultant-update.dtp';
import { Consultant } from 'src/entities/consultant.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ConsultantService {
    constructor(
        @InjectRepository(Consultant)
        private consultantRepo: Repository<Consultant>,
        private mailerService: MailerService
    ) { }

    getConsultants(): any {
        return this.consultantRepo.find();
    }

    async getTotalConsultants(): Promise<number> {
        return this.consultantRepo.count();
    }

    async con_profie(email): Promise<any>
    {
        const data = await this.consultantRepo.findOne({ where: { email } });
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

    updateConsultant(name, email): any
    {
        return this.consultantRepo.update({ email:email },{ name:name });
    }

    async updateConsultantbyid(mydto, id)
    {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(mydto.password, salt);
        mydto.password = hashedPassword;

        const existingConsultantPhone = await this.consultantRepo.findOne({ where: { phone: mydto.phone } });
        const existingConsultantEmail = await this.consultantRepo.findOne({ where: { email: mydto.email } });

        if (mydto.name === '')
        {
            throw new HttpException({ message: "Please provide the username" }, HttpStatus.BAD_REQUEST);
        } 
        else if (mydto.phone === '')
        {
            throw new HttpException({ message: "Please provide the phone number" }, HttpStatus.BAD_REQUEST);
        }
        else if (mydto.email === '')
        {
            throw new HttpException({ message: "Please provide the email" }, HttpStatus.BAD_REQUEST);
        }
        else if (mydto.password === '')
        {
            throw new HttpException({ message: "Please provide the password" }, HttpStatus.BAD_REQUEST);
        }
        else if (mydto.country === '')
        {
            throw new HttpException({ message: "Please provide the country" }, HttpStatus.BAD_REQUEST);
        }
        // else if (existingConsultant)
        // {
        //     throw new HttpException({ message: "Username already exists" }, HttpStatus.BAD_REQUEST);
        // }
        else if(existingConsultantPhone)
        {
            throw new HttpException({ message: "Phone number already exists" }, HttpStatus.BAD_REQUEST);
        }
        else if(existingConsultantEmail)
        {
            throw new HttpException({ message: "Email already exists" }, HttpStatus.BAD_REQUEST);
        }
        else 
        {
            await this.consultantRepo.update(id, mydto);
            throw new HttpException('Consultant Added Successful.', HttpStatus.OK);
        }
    }

    deleteConsultantId(id): any
    {
        return this.consultantRepo.delete(id);
    }

    async addConsultant(mydto)
    {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(mydto.password, salt);
        mydto.password = hashedPassword;

        // const existingConsultant = await this.consultantRepo.findOne({ where: { name: mydto.name } });
        const existingConsultantPhone = await this.consultantRepo.findOne({ where: { phone: mydto.phone } });
        const existingConsultantEmail = await this.consultantRepo.findOne({ where: { email: mydto.email } });

        if (mydto.name === '')
        {
            throw new HttpException({ message: "Please provide the username" }, HttpStatus.BAD_REQUEST);
        } 
        else if (mydto.phone === '')
        {
            throw new HttpException({ message: "Please provide the phone number" }, HttpStatus.BAD_REQUEST);
        }
        else if (mydto.email === '')
        {
            throw new HttpException({ message: "Please provide the email" }, HttpStatus.BAD_REQUEST);
        }
        else if (mydto.password === '')
        {
            throw new HttpException({ message: "Please provide the password" }, HttpStatus.BAD_REQUEST);
        }
        else if (mydto.country === '')
        {
            throw new HttpException({ message: "Please provide the country" }, HttpStatus.BAD_REQUEST);
        }
        // else if (existingConsultant)
        // {
        //     throw new HttpException({ message: "Username already exists" }, HttpStatus.BAD_REQUEST);
        // }
        else if(existingConsultantPhone)
        {
            throw new HttpException({ message: "Phone number already exists" }, HttpStatus.BAD_REQUEST);
        }
        else if(existingConsultantEmail)
        {
            throw new HttpException({ message: "Email already exists" }, HttpStatus.BAD_REQUEST);
        }
        else 
        {
            await this.consultantRepo.save(mydto);
            throw new HttpException('Consultant Added Successful.', HttpStatus.OK);
        }
    }

    async getConsultantById(id)
    {
        const data = await this.consultantRepo.findOne({ where: { id } });

        if (data !== null)
        {
            const { id, password, ...filteredData } = data;
            return filteredData;
        }
        else
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    async signup(mydto)
    {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(mydto.password, salt);
        mydto.password = hashedPassword;

        const existingConsultant = await this.consultantRepo.findOne({ where: { name: mydto.name } });
        const existingConsultantEmail = await this.consultantRepo.findOne({ where: { email: mydto.email } });

        if (mydto.name === '')
        {
            throw new HttpException({ message: "Please provide the username" }, HttpStatus.BAD_REQUEST);
        } 
        else if (mydto.country === '')
        {
            throw new HttpException({ message: "Please provide the country" }, HttpStatus.BAD_REQUEST);
        }
        else if (existingConsultant)
        {
            throw new HttpException({ message: "Username already exists" }, HttpStatus.BAD_REQUEST);
        }
        else if(existingConsultantEmail)
        {
            throw new HttpException({ message: "Email already exists" }, HttpStatus.BAD_REQUEST);
        }
        else 
        {
            await this.consultantRepo.save(mydto);
            throw new HttpException('Registration Successful', HttpStatus.OK);
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
