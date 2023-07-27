import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Manager } from "../entities/manager.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Manager])],
    controllers: [],
    providers: [],
})

export class ManagerModule {}