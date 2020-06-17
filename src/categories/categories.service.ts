import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        const category: CategoryEntity = await this.categoryRepository.create(createCategoryDto);
        await this.categoryRepository.save(category);
        return category;
    }

    async getAllCategories(): Promise<CategoryEntity[]> {
        const categories: CategoryEntity[] = await this.categoryRepository.find();
        return categories;
    }
}
