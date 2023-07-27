import { IsNotEmpty, Length, IsEmail, Matches } from "class-validator";

export class AdminDto {   
    id: number;
    
    username: string;
   
    @IsEmail() 
    @IsNotEmpty()
    email: string;

    @Length(3, 20, {message: 'password must be longer than 3 and shorter than 20'})
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,{message: 'password too weak'})
    password: string;

    address: string;
}