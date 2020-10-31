import { CategoryType } from './category-type.enum';

export class ExpenseCategory {

    id: number;

    name: string;

    user: string;

    level: number;

    childrenCategories: ExpenseCategory[] = [];
    
    parent: ExpenseCategory;

    categoryType: CategoryType;

}
