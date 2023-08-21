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
exports.ConsultantController = void 0;
const common_1 = require("@nestjs/common");
const consultant_service_1 = require("./consultant.service");
const Consultant_dto_1 = require("../dtos/Consultant.dto");
let ConsultantController = class ConsultantController {
    constructor(consultantService) {
        this.consultantService = consultantService;
    }
    getProfile(session) {
        return this.consultantService.con_profie(session.email);
    }
    async signup(mydto) {
        return this.consultantService.signup(mydto);
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
        return this.consultantService.Email(mydata);
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ConsultantController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Consultant_dto_1.ConsultantDto]),
    __metadata("design:returntype", Promise)
], ConsultantController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('/signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConsultantController.prototype, "signout", null);
__decorate([
    (0, common_1.Post)('/email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConsultantController.prototype, "sendEmail", null);
ConsultantController = __decorate([
    (0, common_1.Controller)('consultant'),
    __metadata("design:paramtypes", [consultant_service_1.ConsultantService])
], ConsultantController);
exports.ConsultantController = ConsultantController;
//# sourceMappingURL=consultant.controller.js.map