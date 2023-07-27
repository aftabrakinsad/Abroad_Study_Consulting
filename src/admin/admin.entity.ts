import { ManagerEntity } from 'src/manager/manager.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';

@Entity("admin")
export class Admin{
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
  
  @OneToMany(() => ManagerEntity, (manager) => manager.admins)
  managers: ManagerEntity[];
}