import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ default: 'Sweden' })
  country: string;

  @Column()
  gender: string;

  @Column({ default: '' })
  role: string;

  @Column({ default: '' })
  companyname: string;

  @Column({ default: '' })
  companylocation: string;

  @Column({ default: '' })
  companyservices: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  profileimage: string;
}
