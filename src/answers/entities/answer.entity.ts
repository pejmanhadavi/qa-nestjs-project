import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { QuestionEntity } from '../../questions/entities/question.entity';


@Entity('answer')
export class AnswerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(type => UserEntity, author => author.answers)
    author: UserEntity;

    @ManyToOne(type => QuestionEntity, question => question.answers)
    question: QuestionEntity;

}