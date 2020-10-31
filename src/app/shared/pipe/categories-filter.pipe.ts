import { Pipe, PipeTransform } from '@angular/core';
import { ExpenseCategory } from '../models/expense-category';

@Pipe({
    name: 'categoriesFilter',
    pure: false
})
export class CategoriesFilterPipe implements PipeTransform {
    transform(categories: ExpenseCategory[], currentCategory: ExpenseCategory): any {
        if (currentCategory !== undefined) {
            console.log('Current category is assigned');
            if (currentCategory.parent === null) {
                console.log('Returning current category children nodes');
                return categories.filter(c => c.parent !== null && c.parent.name === currentCategory.name);
            } else {
                console.log('Returning parent level list of current category');
                return categories.filter(c => c.parent !== null && c.parent.level === currentCategory.parent.level);
            }
        }
        return categories;
    }
}