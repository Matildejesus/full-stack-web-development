
import { 
  Column,
  Entity,
  PrimaryGeneratedColumn } 
  from "typeorm";
@Entity()
export  class User {
  @PrimaryGeneratedColumn()
  user_Id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column() //{ unique: true }
  email: string;

  @Column()
  password: string;

  @Column()
  role: string; // 'Candidate' or 'Lecturer'
  // @Column()
  // jobSummary: JobSummary[];
  //   @Column()
  //   lecturerSelection: LecturerSelection[],
}
