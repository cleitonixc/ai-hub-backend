import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("jackson_ttl")
export class JacksonTTL {
    @PrimaryColumn({ name: "jackson_ttl_key", type: "varchar", length: 1500 })
    key: string;

    @Column({ type: "bigint" })
    expiresAt: number;
} 