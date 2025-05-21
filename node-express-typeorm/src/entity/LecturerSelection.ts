import { 
    Column,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn,
    Unique 
} from "typeorm";
import { Lecturer } from "./Lecturer";
import { Application } from "./Application";

@Entity()
@Unique(["lecturer", "application"])
export class LecturerSelection {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Lecturer, (lecturer: Lecturer) => lecturer.lecturerSelections)
    @JoinColumn()
    lecturer: Lecturer;

    @ManyToOne(() => Application, (application: Application) => application.lecturerSelections)
    @JoinColumn()
    application: Application;

    @Column()
    ranking: number;

    @Column()
    comment: string;

}