import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ManagerForm } from 'src/manager/manager.dto';
import { ManagerService } from 'src/manager/manager.service';
import { AdminForm } from './adminform.dto';
import { AdminFormUpdate } from './adminformupdate.dto';
import { AdminService } from './adminservice.service';
import { SessionGuard } from './session.guard';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService,
    private managerService: ManagerService
  ) { }
  @Get('/')
  gethellow(): any {
    return "hellow";
  }

  @Get('/index')
  getAdmin(): any {
    return this.adminService.getIndex();
  }
  
  @Get('/findadmin/:id')
 
  getAdminByID(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getUserByID(id);
  }

  @Get('/findadmin')
  getAdminByIDName(@Query() qry: any): any {
    return this.adminService.getUserByIDName(qry);
  }


  @Post('/insertadmin')
  insertAdmin(@Body() mydto:AdminForm){
   
  console.log(mydto)
  return this.adminService.insertUser(mydto);
  }

  @Put('/updateadmin/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdmin(@Session() session,@Body('name') name: string): any {
    console.log(session.email);
    return this.adminService.updateUser(name, session.email);
  }

  @Put('/updateadmin/:id')
  @UsePipes(new ValidationPipe())
  updateAdminbyid(
    @Body() mydto: AdminFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.adminService.updateUserbyid(mydto, id);
  }

  @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteUserbyid(id);
   
  }

  @Post('/insertmanager')
  @UsePipes(new ValidationPipe())
    insertManager(@Body() managerdto: ManagerForm): any {
      return this.managerService.insertManager(managerdto);
    }
   
    @Get('/findmanagersbyadmin/:id')
    getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.adminService.getManagersByAdminID(id);
    }
  
    @Get('/findadminbymanager/:id')
    getAdminByManagerID(@Param('id', ParseIntPipe) id: number): any {
      return this.managerService.getAdminByManagerID(id);
    }
   
@Post('/signup')
  @UsePipes(new ValidationPipe())
signup(@Body() mydto:AdminForm){
console.log(mydto)
return this.adminService.signup(mydto);

}
  @Post('/signin')
  @UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:AdminForm)
  {
    const res = await (this.adminService.signin(mydto));
if(res==true)
{
  session.email = mydto.email;
  return (session.email);
}
else
{
  throw new UnauthorizedException({ message: "invalid credentials" });
}
}
@Get('/signout')
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
@Post('/sendemail')
sendEmail(@Body() mydata){
return this.adminService.sendEmail(mydata);
}





}
