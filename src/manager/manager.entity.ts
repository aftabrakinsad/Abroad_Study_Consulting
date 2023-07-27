import { Admin } from 'src/admin/admin.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("manager")
export class ManagerEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @ManyToOne(() => Admin, (admin) => admin.managers)
    admins: Admin

}