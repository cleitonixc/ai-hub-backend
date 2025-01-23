import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { JacksonStore } from "./jacksonStore.entity";

@Entity("jackson_index")
export class JacksonIndex {
    @PrimaryGeneratedColumn({ name: "_jackson_index_id" })
    id: number;

    @Column({ type: "varchar", length: 1500 })
    key: string;

    @Column({ type: "varchar", length: 1500 })
    storeKey: string;

    @ManyToOne(() => JacksonStore, store => store.jackson_index, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "storeKey", referencedColumnName: "key" })
    store: JacksonStore;
} 