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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const manager_entity_1 = require("../entities/manager.entity");
const admin_entity_1 = require("../entities/admin.entity");
const dist_1 = require("@nestjs-modules/mailer/dist");
const bcrypt = require("bcrypt");
let ManagerService = exports.ManagerService = class ManagerService {
    constructor(managerRepo, mailerService) {
        this.managerRepo = managerRepo;
        this.mailerService = mailerService;
    }
    async manager_profie(email) {
        const data = await this.managerRepo.findOne({ where: { email } });
        if (data !== null) {
            const { id } = data, filteredData = __rest(data, ["id"]);
            return filteredData;
        }
        else {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getTotalManagers() {
        return this.managerRepo.count();
    }
    async addManager(managerDto, adminId) {
        const newManager = new manager_entity_1.Manager();
        newManager.name = managerDto.name;
        newManager.email = managerDto.email;
        newManager.password = managerDto.password;
        newManager.address = managerDto.address;
        const admin = new admin_entity_1.Admin();
        admin.id = adminId;
        newManager.admin = admin;
        return this.managerRepo.save(newManager);
    }
    updateManager(name, email) {
        return this.managerRepo.update({ email: email }, { name: name });
    }
    updateManagerbyId(mydto, id) {
        return this.managerRepo.update(id, mydto);
    }
    deleteManagerbyId(id) {
        return this.managerRepo.delete(id);
    }
    getAdminByManagerID(id) {
        return this.managerRepo.find({
            where: { id: id },
            relations: {
                admin: true,
            },
        });
    }
    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(mydto.password, salt);
        mydto.password = hashedPassword;
        const existingManager = await this.managerRepo.findOne({ where: { name: mydto.name } });
        const existingManagerEmail = await this.managerRepo.findOne({ where: { email: mydto.email } });
        if (mydto.name === '') {
            throw new common_1.HttpException({ message: "Please provide the username" }, common_1.HttpStatus.BAD_REQUEST);
        }
        else if (mydto.address === '') {
            throw new common_1.HttpException({ message: "Please provide the address" }, common_1.HttpStatus.BAD_REQUEST);
        }
        else if (existingManager) {
            throw new common_1.HttpException({ message: "Username already exists" }, common_1.HttpStatus.BAD_REQUEST);
        }
        else if (existingManagerEmail) {
            throw new common_1.HttpException({ message: "Email already exists" }, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            await this.managerRepo.save(mydto);
            throw new common_1.HttpException('Registration Successful', common_1.HttpStatus.OK);
        }
    }
    async signin(mydto) {
        if (mydto.email != null && mydto.password != null) {
            const mydata = await this.managerRepo.findOneBy({ email: mydto.email });
            if (!mydata) {
                throw new common_1.UnauthorizedException({ message: "Email didn't match" });
            }
            const isMatch = await bcrypt.compare(mydto.password, mydata.password);
            if (isMatch) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            throw new common_1.UnauthorizedException({ message: "invalid credentials" });
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
exports.ManagerService = ManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(manager_entity_1.Manager)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        dist_1.MailerService])
], ManagerService);
//# sourceMappingURL=manager.service.js.map