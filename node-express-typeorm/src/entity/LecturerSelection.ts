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

@Entity({ name: "lecturer_selections" })
@Unique(["lecturer", "application"])
export class LecturerSelection {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => Lecturer, (lecturer: Lecturer) => lecturer.lecturerSelections)
    @JoinColumn({ name: "lecturer_id" })
    lecturer: Lecturer;

    @ManyToOne(() => Application, (application: Application) => application.lecturerSelections)
    @JoinColumn({ name: "application_id" })
    application: Application;

    @Column({ type: "int" })
    ranking: number;

    @Column({ type: "text" })
    comment: string;

}