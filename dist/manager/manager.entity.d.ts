import { AdminEntity } from 'src/admin/adminentity.entity';
export declare class ManagerEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    admin: AdminEntity;
}
