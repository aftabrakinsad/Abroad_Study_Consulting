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
  Req,
  Res,
} from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { ManagerService } from 'src/manager/manager.service';
import { AdminUpdateDto } from '../dtos/admin-update.dto';
import { AdminService } from './admin.service';
import { AdminDto } from '../dtos/admin.dto';
import { ManagerDto } from 'src/dtos/manager.dto';
import { SessionGuard } from 'src/session.guard';
import { ConsultantDto } from 'src/dtos/Consultant.dto';
import { ConsultantService } from 'src/consultant/consultant.service';
import { ManagerUpdateDto } from 'src/dtos/manager-update.dto';
import { CounsultantUpdateDto } from 'src/dtos/consultant-update.dtp';

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private managerService: ManagerService,
    private consultantService: ConsultantService,
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

  @Put('/updateManager/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateManager(@Session() session, @Body('name') name: string): any {
    // console.log(session.email);
    return this.managerService.updateManager(name, session.email);
  }

  @Put('/updateConsultant/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateConsultant(@Session() session, @Body('name') name: string): any {
    // console.log(session.email);
    return this.consultantService.updateConsultant(name, session.email);
  }

  @Put('/updateAdmin/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdminbyid(@Body() mydto: AdminUpdateDto, @Param('id', ParseIntPipe) id: number): any {
    return this.adminService.updateAdminbyId(mydto, id);
  }

  @Put('/updateManager/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateManagerbyid(@Body() mydto: ManagerUpdateDto, @Param('id', ParseIntPipe) id: number): any {
    return this.managerService.updateManagerbyId(mydto, id);
  }

  @Put('/updateConsultant/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateConsultantbyid(@Body() mydto: CounsultantUpdateDto, @Param('id', ParseIntPipe) id: number): any {
    return this.consultantService.updateConsultantbyid(mydto, id);
  }

  @Delete('/deleteAdmin/:id')
  @UseGuards(SessionGuard)
  deleteAdminbyId(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteAdminbyId(id);
  }

  @Delete('/deleteManager/:id')
  @UseGuards(SessionGuard)
  deleteManagerId(@Param('id', ParseIntPipe) id: number): any {
    return this.managerService.deleteManagerbyId(id);
  }

  @Delete('/deleteConsultant/:id')
  @UseGuards(SessionGuard)
  deleteConsultantId(@Param('id', ParseIntPipe) id: number): any {
    return this.consultantService.deleteConsultantId(id);
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

  @Post('/addConsultant')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async addConsultant(@Body() consultantDto: ConsultantDto, adminDto: AdminDto): Promise<any> {
      return this.consultantService.addConsultant(consultantDto);
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
  // @UsePipes(new ValidationPipe())
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
  // @UseGuards(SessionGuard)
  signout(@Req() request, @Res() response) {
    request.session.destroy((err) => {
      if (err) {
        throw new UnauthorizedException("Failed to logout");
      }
      response.clearCookie("connect.sid");
      response.send({ message: "You are logged out" });
    });
  }

  @Post('/email')
  @UseGuards(SessionGuard)
  sendEmail(@Body() mydata){
    return this.adminService.Email(mydata);
  }
}