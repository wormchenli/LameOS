import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("folders")
export class Folders {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text", unique: true, nullable: false })
    uuid!: string;

    @Column()
    name!: string;

    @Column()
    path!: string;

    @Column({ nullable: true })
    icon?: string;

    @Column({ type: "boolean", nullable: false })
    isempty!: boolean;

    @Column({ type: "boolean", nullable: false })
    isdeleted!: boolean;

    @Column({ nullable: true, type: "text" })
    parentid: string | null = null;
}
