import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class FSObject {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text", unique: true, nullable: false })
    uuid!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    path!: string;

    @Column({ nullable: true })
    icon?: string;

    @Column({ type: "boolean", nullable: false })
    isdeleted!: boolean;

    @Column({ nullable: true, type: "text" })
    parentid?: string;
}
