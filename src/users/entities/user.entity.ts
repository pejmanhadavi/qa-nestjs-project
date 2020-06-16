import {
    Entity,
    Column,
    BeforeInsert,
    BeforeUpdate,
    PrimaryGeneratedColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}