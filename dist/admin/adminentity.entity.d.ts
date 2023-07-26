import { ManagerEntity } from 'src/manager/manager.entity';
export declare class AdminEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    managers: ManagerEntity[];
}
