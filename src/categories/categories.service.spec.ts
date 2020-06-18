import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';


const category = new CategoryEntity();
category.id = 1;
category.name = 'category name';

const categories = [category, category, category];


describe('CategoriesService', () => {
  let categoryService: CategoriesService;
  let categoryRepo: Repository<CategoryEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            create: jest.fn().mockImplementation(({ name }) => {
              const category = new CategoryEntity();
              category.name = name;
              return category;
            }),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(categories),
            findOne: jest.fn().mockImplementation(options => {
              const id = options.where.id;
              return id === 1 ? category : null;
            }),
          }
        }
      ],
    }).compile();

    categoryService = module.get<CategoriesService>(CategoriesService);
    categoryRepo = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create category', async () => {
      const newCategory = await categoryService.createCategory({ name: 'category name2' });
      expect(newCategory.name).toBe('category name2');
      expect(categoryRepo.create).toBeCalledWith({ name: 'category name2' });
    });
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      const newCategories = await categoryService.getAllCategories();
      expect(newCategories).toBe(categories);
    });
  });

  describe('getCategory', () => {
    it('should return category if found.', async () => {
      const newCategory = await categoryService.getCategory(1);
      expect(newCategory).toBe(category);
    });

    it('should not return category if not found.', async () => {
      const newCategory = await categoryService.getCategory(2);
      expect(newCategory).not.toBe(category);
    });
  });
});
