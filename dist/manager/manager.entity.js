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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerEntity = void 0;
const adminentity_entity_1 = require("../admin/adminentity.entity");
const typeorm_1 = require("typeorm");
let ManagerEntity = class ManagerEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ManagerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ManagerEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ManagerEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ManagerEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ManagerEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => adminentity_entity_1.AdminEntity, (admin) => admin.managers),
    __metadata("design:type", adminentity_entity_1.AdminEntity)
], ManagerEntity.prototype, "admin", void 0);
ManagerEntity = __decorate([
    (0, typeorm_1.Entity)("manager")
], ManagerEntity);
exports.ManagerEntity = ManagerEntity;
//# sourceMappingURL=manager.entity.js.map