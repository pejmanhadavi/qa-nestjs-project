import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category: Category = await this.categoryRepository.create(createCategoryDto);
        await this.categoryRepository.save(category);
        return category;
    }

    async getAllCategories(): Promise<Category[]> {
        const categories: Category[] = await this.categoryRepository.find();
        return categories;
    }
}
