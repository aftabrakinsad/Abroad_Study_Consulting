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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const manager_service_1 = require("../manager/manager.service");
const admin_update_dto_1 = require("../dtos/admin-update.dto");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("../dtos/admin.dto");
const manager_dto_1 = require("../dtos/manager.dto");
const Consultant_dto_1 = require("../dtos/Consultant.dto");
const consultant_service_1 = require("../consultant/consultant.service");
const manager_update_dto_1 = require("../dtos/manager-update.dto");
const consultant_update_dtp_1 = require("../dtos/consultant-update.dtp");
let AdminController = class AdminController {
    constructor(adminService, managerService, consultantService) {
        this.adminService = adminService;
        this.managerService = managerService;
        this.consultantService = consultantService;
    }
    getAdmin() {
        return this.adminService.getIndex();
    }
    getManagers() {
        return this.managerService.getManagers();
    }
    getConsultants() {
        return this.consultantService.getConsultants();
    }
    getAdminStatistics() {
        return this.adminService.getTotalAdmins();
    }
    getManagerStatistics() {
        return this.managerService.getTotalManagers();
    }
    getConsultantStatistics() {
        return this.consultantService.getTotalConsultants();
    }
    getProfile(session) {
        return this.adminService.myprofie(session.email);
    }
    getAdminByID(id) {
        return this.adminService.getAdminById(id);
    }
    getConsultantByID(id) {
        return this.consultantService.getConsultantById(id);
    }
    getManagerByID(id) {
        return this.managerService.getManagerById(id);
    }
    getAdminByName(username) {
        return this.adminService.getAdminByName(username);
    }
    getAdminByEmail(email) {
        return this.adminService.getAdminByEmail(email);
    }
    async updateAdmin(adminDto) {
        return this.adminService.updateAdmin(adminDto);
    }
    updateManager(session, name) {
        return this.managerService.updateManager(name, session.email);
    }
    updateConsultant(session, name) {
        return this.consultantService.updateConsultant(name, session.email);
    }
    updateAdminbyid(mydto, id) {
        return this.adminService.updateAdminbyId(mydto, id);
    }
    updateManagerbyid(mydto, id) {
        return this.managerService.updateManagerbyId(mydto, id);
    }
    updateConsultantbyid(mydto, id) {
        return this.consultantService.updateConsultantbyid(id, mydto);
    }
    deleteAdminbyId(id) {
        return this.adminService.deleteAdminbyId(id);
    }
    deleteManagerId(id) {
        return this.managerService.deleteManagerbyId(id);
    }
    deleteConsultantId(id) {
        return this.consultantService.deleteConsultantId(id);
    }
    async addAdmin(admindto) {
        return this.adminService.addAdmin(admindto);
    }
    async addManager(managerDto) {
        return this.managerService.addManager(managerDto);
    }
    async addConsultant(consultantDto) {
        return this.consultantService.addConsultant(consultantDto);
    }
    async signup(mydto) {
        return this.adminService.signup(mydto);
    }
    async signin(session, mydto) {
        const res = await this.adminService.signin(mydto);
        if (res == true) {
            session.email = mydto.email;
            throw new exceptions_1.HttpException({ message: "Login Successful!" }, common_1.HttpStatus.ACCEPTED);
        }
        else {
            throw new exceptions_1.UnauthorizedException({ message: "invalid credentials" });
        }
    }
    signout(req) {
        if (req.session.destroy()) {
            return ({ message: "You are logged out" });
        }
        else {
            throw new exceptions_1.UnauthorizedException("invalid actions");
        }
    }
    async sendEmail(mydata) {
        try {
            const result = await this.adminService.sendEmail(mydata);
            return { message: 'Email sent successfully', result };
        }
        catch (error) {
            return { message: 'Failed to send email', error: error.message };
        }
    }
};
__decorate([
    (0, common_1.Get)('/index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Get)('/managers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getManagers", null);
__decorate([
    (0, common_1.Get)('/consultants'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getConsultants", null);
__decorate([
    (0, common_1.Get)('/adminCount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminStatistics", null);
__decorate([
    (0, common_1.Get)('/managerCount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getManagerStatistics", null);
__decorate([
    (0, common_1.Get)('/consultantCount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getConsultantStatistics", null);
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByID", null);
__decorate([
    (0, common_1.Get)('/consultant/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getConsultantByID", null);
__decorate([
    (0, common_1.Get)('/manager/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getManagerByID", null);
__decorate([
    (0, common_1.Get)('username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByName", null);
__decorate([
    (0, common_1.Get)('/email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByEmail", null);
__decorate([
    (0, common_1.Put)('/updateAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Put)('/updateManager/'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateManager", null);
__decorate([
    (0, common_1.Put)('/updateConsultant/'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateConsultant", null);
__decorate([
    (0, common_1.Put)('/updateAdmin/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_dto_1.AdminUpdateDto, Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdminbyid", null);
__decorate([
    (0, common_1.Put)('/updateManager/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manager_update_dto_1.ManagerUpdateDto, Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateManagerbyid", null);
__decorate([
    (0, common_1.Put)('/updateConsultant/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consultant_update_dtp_1.CounsultantUpdateDto, Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateConsultantbyid", null);
__decorate([
    (0, common_1.Delete)('/deleteAdmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteAdminbyId", null);
__decorate([
    (0, common_1.Delete)('/deleteManager/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteManagerId", null);
__decorate([
    (0, common_1.Delete)('/deleteConsultant/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteConsultantId", null);
__decorate([
    (0, common_1.Post)('/addAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addAdmin", null);
__decorate([
    (0, common_1.Post)('/addManager'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manager_dto_1.ManagerDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addManager", null);
__decorate([
    (0, common_1.Post)('/addConsultant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Consultant_dto_1.ConsultantDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addConsultant", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('/signout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signout", null);
__decorate([
    (0, common_1.Post)('/send-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "sendEmail", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        manager_service_1.ManagerService,
        consultant_service_1.ConsultantService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map