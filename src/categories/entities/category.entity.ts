import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { QuestionEntity } from 'src/questions/entities/question.entity';


@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => QuestionEntity, question => question.category, {cascade: true,})
    questions: QuestionEntity[];
}