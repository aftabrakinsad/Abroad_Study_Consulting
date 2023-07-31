import { Body, Controller, Get, Post, Session, UseGuards, ValidationPipe, UsePipes, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { SessionGuard } from 'src/session.guard';
import { ManagerService } from './manager.service';
import { ManagerDto } from 'src/dtos/manager.dto';

@Controller('consultant')
export class ManagerController {
    constructor(
        private managerService: ManagerService,
    ) { }

    @Get('/profile')
    // @UseGuards(SessionGuard)
    getProfile(@Session() session): any 
    {
      return this.managerService.manager_profie(session.email);
    }

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    async signup(@Body() mydto: ManagerDto): Promise<any> {
    // console.log(mydto)
        return this.managerService.signup(mydto);
    }

    @Post('/signin')
    @UsePipes(new ValidationPipe())
    async signin(@Session() session, @Body() mydto: ManagerDto) {
        const res = await this.managerService.signin(mydto);
        if (res == true)
        {
            session.email = mydto.email;
            console.log(session.email);
            throw new HttpException({ message: "Login Successful!" }, HttpStatus.ACCEPTED);
        }
        else
        {
        throw new UnauthorizedException({ message: "invalid credentials" });
        }
    }

    @Get('/signout')
    @UseGuards(SessionGuard)
    signout(@Session() session)
    {
        if(session.destroy())
        {
        return {message:"you are logged out"};
        }
        else
        {
        throw new UnauthorizedException("invalid actions");
        }
    }

    @Post('/email')
    // @UseGuards(SessionGuard)
    sendEmail(@Body() mydata){
      return this.managerService.Email(mydata);
    }
}
