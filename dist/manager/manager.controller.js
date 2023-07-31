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
exports.ManagerController = void 0;
const common_1 = require("@nestjs/common");
const session_guard_1 = require("../session.guard");
const manager_service_1 = require("./manager.service");
const manager_dto_1 = require("../dtos/manager.dto");
let ManagerController = class ManagerController {
    constructor(managerService) {
        this.managerService = managerService;
    }
    getProfile(session) {
        return this.managerService.manager_profie(session.email);
    }
    async signup(mydto) {
        return this.managerService.signup(mydto);
    }
    async signin(session, mydto) {
        const res = await this.managerService.signin(mydto);
        if (res == true) {
            session.email = mydto.email;
            console.log(session.email);
            throw new common_1.HttpException({ message: "Login Successful!" }, common_1.HttpStatus.ACCEPTED);
        }
        else {
            throw new common_1.UnauthorizedException({ message: "invalid credentials" });
        }
    }
    signout(session) {
        if (session.destroy()) {
            return { message: "you are logged out" };
        }
        else {
            throw new common_1.UnauthorizedException("invalid actions");
        }
    }
    sendEmail(mydata) {
        return this.managerService.Email(mydata);
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ManagerController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manager_dto_1.ManagerDto]),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, manager_dto_1.ManagerDto]),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('/signout'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "signout", null);
__decorate([
    (0, common_1.Post)('/email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "sendEmail", null);
ManagerController = __decorate([
    (0, common_1.Controller)('consultant'),
    __metadata("design:paramtypes", [manager_service_1.ManagerService])
], ManagerController);
exports.ManagerController = ManagerController;
//# sourceMappingURL=manager.controller.js.map