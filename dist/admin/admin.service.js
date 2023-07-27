"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
const bcrypt = require("bcrypt");
const dist_1 = require("@nestjs-modules/mailer/dist");
let AdminService = class AdminService {
    constructor(adminRepo, mailerService) {
        this.adminRepo = adminRepo;
        this.mailerService = mailerService;
    }
    getIndex() {
        return this.adminRepo.find();
    }
    async getAdminById(id) {
        const data = await this.adminRepo.findOneBy({ id });
        if (data !== null) {
            return data;
        }
        else {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async addAdmin(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password = hassedpassed;
        return this.adminRepo.save(mydto);
    }
    updateAdmin(name, email) {
        return this.adminRepo.update({ email: email }, { name: name });
    }
    updateAdminbyId(mydto, id) {
        return this.adminRepo.update(id, mydto);
    }
    deleteAdminbyId(id) {
        return this.adminRepo.delete(id);
    }
    ManagersByAdminId(id) {
        return this.adminRepo.find({
            where: { id: id },
            relations: {
                managers: true,
            },
        });
    }
    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(mydto.password, salt);
        mydto.password = hashedPassword;
        const existingUser = await this.adminRepo.findOne({ where: { name: mydto.name } });
        if (existingUser) {
            throw new common_1.HttpException({ message: "Username already exists" }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (mydto.name === '') {
            throw new common_1.HttpException({ message: "Please provide the username" }, common_1.HttpStatus.BAD_REQUEST);
        }
        else if (mydto.address === '') {
            throw new common_1.HttpException({ message: "Please provide the address" }, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            await this.adminRepo.save(mydto);
            throw new common_1.HttpException('Registration Successful', common_1.HttpStatus.OK);
        }
    }
    async signin(mydto) {
        if (mydto.email != null && mydto.password != null) {
            const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
            const isMatch = await bcrypt.compare(mydto.password, mydata.password);
            if (isMatch) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    async Email(mydata) {
        return await this.mailerService.sendMail({
            to: mydata.email,
            subject: mydata.subject,
            text: mydata.text,
        });
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        dist_1.MailerService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map