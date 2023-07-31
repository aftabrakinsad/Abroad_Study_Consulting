import { IsNotEmpty, IsInt, Length } from "class-validator";

export class ManagerUpdateDto {    
    @Length(3,5)
    name: string;
}