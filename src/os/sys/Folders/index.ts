import { Entity, Column } from "typeorm";
import { FSObject } from "../FSObject";

@Entity("folders")
export class Folders extends FSObject {
    @Column({ type: "boolean", nullable: false })
    isempty!: boolean;
}
