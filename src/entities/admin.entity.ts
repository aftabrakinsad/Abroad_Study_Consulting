import { Manager } from 'src/entities/manager.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;
  
  // @OneToMany(() => Manager, (manager) => manager.admin)
  // managers: Manager[];
}