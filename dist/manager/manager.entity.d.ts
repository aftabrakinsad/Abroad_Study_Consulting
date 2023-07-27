import { Admin } from 'src/admin/admin.entity';
export declare class ManagerEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    admins: Admin;
}
