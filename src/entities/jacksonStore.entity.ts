import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { JacksonIndex } from "./jacksonIndex.entity";

@Entity("jackson_store")
export class JacksonStore {
    @PrimaryColumn({ name: "_jackson_store_key", type: "varchar", length: 1500 })
    key: string;

    @Column()
    value: string;

    @Column({ type: "varchar", length: 64, nullable: true })
    iv: string | null;

    @Column({ type: "varchar", length: 64, nullable: true })
    tag: string | null;

    @CreateDateColumn({ type: "timestamp", precision: 6 })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", precision: 6, nullable: true })
    modifiedAt: Date | null;

    @Column({ type: "varchar", length: 256, nullable: true })
    namespace: string | null;

    @OneToMany(() => JacksonIndex, index => index.store)
    jackson_index: JacksonIndex[];
} 