import { ConsultantService } from './consultant.service';
import { ConsultantDto } from 'src/dtos/Consultant.dto';
export declare class ConsultantController {
    private consultantService;
    constructor(consultantService: ConsultantService);
    getProfile(session: any): any;
    signup(mydto: ConsultantDto): Promise<any>;
    signout(session: any): {
        message: string;
    };
    sendEmail(mydata: any): Promise<SentMessageInfo>;
}
