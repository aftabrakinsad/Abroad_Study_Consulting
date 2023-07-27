import { Admin } from 'src/entities/admin.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("manager")
export class Manager {
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
  admin: Admin;
}