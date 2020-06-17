import {
    Entity,
    Column,
    BeforeInsert,
    BeforeUpdate,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { QuestionEntity } from 'src/questions/entities/question.entity'
import { AnswerEntity } from 'src/answers/entities/answer.entity';


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

    @OneToMany(type => QuestionEntity, question => question.author, { cascade: true })
    questions: QuestionEntity[];
    
    @OneToMany(type => AnswerEntity, answer => answer.author, { cascade: true })
    answers: AnswerEntity[];    
}