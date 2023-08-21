import { Body, Controller, Get, Post, Session, UseGuards, ValidationPipe, UsePipes, UnauthorizedException } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { SessionGuard } from 'src/session.guard';
import { ConsultantDto } from 'src/dtos/Consultant.dto';

@Controller('consultant')
export class ConsultantController {
    constructor(
        private consultantService: ConsultantService,
    ) { }

    @Get('/profile')
    // @UseGuards(SessionGuard)
    getProfile(@Session() session): any 
    {
      return this.consultantService.con_profie(session.email);
    }

    @Post('/signup')
    // @UsePipes(new ValidationPipe())
    async signup(@Body() mydto: ConsultantDto): Promise<any> {
    // console.log(mydto)
      return this.consultantService.signup(mydto);
    }

    @Get('/signout')
    // @UseGuards(SessionGuard)
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
      return this.consultantService.Email(mydata);
    }
}
