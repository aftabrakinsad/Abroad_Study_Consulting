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
const manager_dto_1 = require("../manager/manager.dto");
const manager_service_1 = require("../manager/manager.service");
const adminform_dto_1 = require("./adminform.dto");
const adminformupdate_dto_1 = require("./adminformupdate.dto");
const adminservice_service_1 = require("./adminservice.service");
const session_guard_1 = require("./session.guard");
let AdminController = class AdminController {
    constructor(adminService, managerService) {
        this.adminService = adminService;
        this.managerService = managerService;
    }
    gethellow() {
        return "hellow";
    }
    getAdmin() {
        return this.adminService.getIndex();
    }
    getAdminByID(id) {
        return this.adminService.getUserByID(id);
    }
    getAdminByIDName(qry) {
        return this.adminService.getUserByIDName(qry);
    }
    insertAdmin(mydto) {
        console.log(mydto);
        return this.adminService.insertUser(mydto);
    }
    updateAdmin(session, name) {
        console.log(session.email);
        return this.adminService.updateUser(name, session.email);
    }
    updateAdminbyid(mydto, id) {
        return this.adminService.updateUserbyid(mydto, id);
    }
    deleteAdminbyid(id) {
        return this.adminService.deleteUserbyid(id);
    }
    insertManager(managerdto) {
        return this.managerService.insertManager(managerdto);
    }
    getManagerByAdminID(id) {
        return this.adminService.getManagersByAdminID(id);
    }
    getAdminByManagerID(id) {
        return this.managerService.getAdminByManagerID(id);
    }
    signup(mydto) {
        console.log(mydto);
        return this.adminService.signup(mydto);
    }
    async signin(session, mydto) {
        const res = await (this.adminService.signin(mydto));
        if (res == true) {
            session.email = mydto.email;
            return (session.email);
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
        return this.adminService.sendEmail(mydata);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "gethellow", null);
__decorate([
    (0, common_1.Get)('/index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Get)('/findadmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByID", null);
__decorate([
    (0, common_1.Get)('/findadmin'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByIDName", null);
__decorate([
    (0, common_1.Post)('/insertadmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminform_dto_1.AdminForm]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "insertAdmin", null);
__decorate([
    (0, common_1.Put)('/updateadmin/'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Put)('/updateadmin/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminformupdate_dto_1.AdminFormUpdate, Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdminbyid", null);
__decorate([
    (0, common_1.Delete)('/deleteadmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteAdminbyid", null);
__decorate([
    (0, common_1.Post)('/insertmanager'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manager_dto_1.ManagerForm]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "insertManager", null);
__decorate([
    (0, common_1.Get)('/findmanagersbyadmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getManagerByAdminID", null);
__decorate([
    (0, common_1.Get)('/findadminbymanager/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByManagerID", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminform_dto_1.AdminForm]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, adminform_dto_1.AdminForm]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('/signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signout", null);
__decorate([
    (0, common_1.Post)('/sendemail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "sendEmail", null);
AdminController = __decorate([
    (0, common_1.Controller)('/admin'),
    __metadata("design:paramtypes", [adminservice_service_1.AdminService,
        manager_service_1.ManagerService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map