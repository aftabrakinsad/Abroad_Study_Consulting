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
const admin_update_dto_1 = require("./admin-update.dto");
const admin_service_1 = require("./admin.service");
const session_guard_1 = require("./session.guard");
const admin_dto_1 = require("../dtos/admin.dto");
const manager_dto_1 = require("../dtos/manager.dto");
let AdminController = class AdminController {
    constructor(adminService, managerService) {
        this.adminService = adminService;
        this.managerService = managerService;
    }
    getAdmin() {
        return this.adminService.getIndex();
    }
    getProfile(session) {
        return this.adminService.myprofie(session.email);
    }
    getAdminByID(id) {
        return this.adminService.getAdminById(id);
    }
    addAdmin(mydto) {
        return this.adminService.addAdmin(mydto);
    }
    updateAdmin(session, name) {
        return this.adminService.updateAdmin(name, session.email);
    }
    updateAdminbyid(mydto, id) {
        return this.adminService.updateAdminbyId(mydto, id);
    }
    deleteAdminbyId(id) {
        return this.adminService.deleteAdminbyId(id);
    }
    async addManager(managerDto, adminDto) {
        const adminId = adminDto.id;
        console.log(adminId);
        return this.managerService.addManager(managerDto, adminId);
    }
    getManagerByAdminId(id) {
        return this.adminService.ManagersByAdminId(id);
    }
    getAdminByManagerId(id) {
        return this.managerService.getAdminByManagerID(id);
    }
    async signup(mydto) {
        return this.adminService.signup(mydto);
    }
    async signin(session, mydto) {
        const res = await this.adminService.signin(mydto);
        if (res == true) {
            session.adminId = mydto.id;
            session.email = mydto.email;
            console.log(session.email);
            console.log(session.adminId);
            throw new exceptions_1.HttpException({ message: "Login Successful!" }, common_1.HttpStatus.ACCEPTED);
        }
        else {
            throw new exceptions_1.UnauthorizedException({ message: "invalid credentials" });
        }
    }
    signout(session) {
        if (session.destroy()) {
            return { message: "you are logged out" };
        }
        else {
            throw new exceptions_1.UnauthorizedException("invalid actions");
        }
    }
    sendEmail(mydata) {
        return this.adminService.Email(mydata);
    }
};
__decorate([
    (0, common_1.Get)('/index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByID", null);
__decorate([
    (0, common_1.Post)('/addAdmin'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addAdmin", null);
__decorate([
    (0, common_1.Put)('/updateAdmin/'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Put)('/updateAdmin/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_dto_1.AdminUpdateDto, Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdminbyid", null);
__decorate([
    (0, common_1.Delete)('/deleteadmin/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteAdminbyId", null);
__decorate([
    (0, common_1.Post)('/addManager'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manager_dto_1.ManagerDto, admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addManager", null);
__decorate([
    (0, common_1.Get)('/managersbyAdmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getManagerByAdminId", null);
__decorate([
    (0, common_1.Get)('/adminbyManager/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByManagerId", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('/signout'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signout", null);
__decorate([
    (0, common_1.Post)('/email'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "sendEmail", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        manager_service_1.ManagerService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map