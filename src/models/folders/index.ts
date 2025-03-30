import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Folder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    uuid!: string;

    @Column()
    name!: string;

    @Column()
    path!: string;

    @Column({ nullable: true })
    icon?: string;

    @Column()
    isEmpty!: boolean;

    @Column()
    isDeleted!: boolean;

    @Column({ nullable: true })
    parent_id?: string;
}
