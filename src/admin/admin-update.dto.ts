import { IsNotEmpty, IsInt, Length } from "class-validator";

export class AdminUpdateDto {    
    @Length(3,8)
    username: string;
}