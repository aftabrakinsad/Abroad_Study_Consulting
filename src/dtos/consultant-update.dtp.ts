import { IsNotEmpty, IsInt, Length } from "class-validator";

export class CounsultantUpdateDto {    
    @Length(3,5)
    name: string;
}