import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne
} from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';
import { AnswerEntity } from '../../answers/entities/answer.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';


@Entity('question')
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(type => UserEntity, author => author.questions)
    author: UserEntity;

    @OneToMany(type => AnswerEntity, answer => answer.question, { cascade: true, })
    answers: AnswerEntity[];

    @ManyToOne(type => CategoryEntity, category => category.questions)
    category: CategoryEntity;

}