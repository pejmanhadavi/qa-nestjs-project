import { Controller, Post, Get, Body } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Get()
    async getCategories() {
        return await this.categoriesService.getAllCategories();
    }
}
