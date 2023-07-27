import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { ManagerService } from 'src/manager/manager.service';
import { AdminUpdateDto } from './admin-update.dto';
import { AdminService } from './admin.service';
import { SessionGuard } from './session.guard';
import { AdminDto } from '../dtos/admin.dto';
import { ManagerDto } from 'src/dtos/manager.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private managerService: ManagerService
  ) { }

  @Get('/index')
  getAdmin(): any {
    return this.adminService.getIndex();
  }

  @Get('/profile')
  @UseGuards(SessionGuard)
  getProfile(@Session() session): any {
    return this.adminService.myprofie(session.email);
  }
  
  @Get('/:id')
  @UseGuards(SessionGuard)
  getAdminByID(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getAdminById(id);
  }

  @Post('/addAdmin')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  addAdmin(@Body() mydto: AdminDto)
  {
    // console.log(mydto)
    return this.adminService.addAdmin(mydto);
  }

  @Put('/updateAdmin/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdmin(@Session() session, @Body('name') name: string): any {
    // console.log(session.email);
    return this.adminService.updateAdmin(name, session.email);
  }

  @Put('/updateAdmin/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdminbyid(@Body() mydto: AdminUpdateDto, @Param('id', ParseIntPipe) id: number): any {
    return this.adminService.updateAdminbyId(mydto, id);
  }

  @Delete('/deleteadmin/:id')
  @UseGuards(SessionGuard)
  deleteAdminbyId(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteAdminbyId(id);
  }

  // @Post('/addManager')
  // @UseGuards(SessionGuard)
  // @UsePipes(new ValidationPipe())
  // addManager(@Body() managerdto: ManagerDto): any {
  //   return this.managerService.addManager(managerdto);
  // }

  @Post('/addManager')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async addManager(@Body() managerDto: ManagerDto, adminDto: AdminDto): Promise<any> {
      const adminId = adminDto.id;
      console.log(adminId);
      return this.managerService.addManager(managerDto, adminId);
  }
   
  @Get('/managersbyAdmin/:id')
  getManagerByAdminId(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.ManagersByAdminId(id);
  }
  
  @Get('/adminbyManager/:id')
  @UseGuards(SessionGuard)
  getAdminByManagerId(@Param('id', ParseIntPipe) id: number): any {
    return this.managerService.getAdminByManagerID(id);
  }
   
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() mydto: AdminDto): Promise<any> {
    // console.log(mydto)
    return this.adminService.signup(mydto);
  }

  @Post('/signin')
  @UsePipes(new ValidationPipe())
  async signin(@Session() session, @Body() mydto: AdminDto) {
    const res = await this.adminService.signin(mydto);
    if (res == true)
    {
      session.adminId = mydto.id;
      session.email = mydto.email;
      console.log(session.email);
      console.log(session.adminId);
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
  @UseGuards(SessionGuard)
  sendEmail(@Body() mydata){
    return this.adminService.Email(mydata);
  }
}