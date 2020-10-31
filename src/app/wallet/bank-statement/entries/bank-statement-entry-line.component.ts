import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BankStatementEntry } from '../../../shared/models/bank-statement-entry';
import { CategoryType } from '../../../shared/models/category-type.enum';
import { ExpenseCategory } from '../../../shared/models/expense-category';

@Component({
    selector: 'tr[wallet-bank-statement-entry]',
    templateUrl: './bank-statement-entry-line.component.html'
})
export class BankStatementEntryLineComponent implements OnChanges, OnInit {

    @Input() entry: BankStatementEntry;
    @Input() categories: ExpenseCategory[];
    categoriesToSee: ExpenseCategory[] = [];
    selectedCategory: ExpenseCategory;
    hideButtonBackward: boolean = true;
    hideButtonForward: boolean = true;
    backwardButtonSubject = new Subject<boolean>();
    forwardButtonSubject = new Subject<boolean>();

    constructor() { }

    ngOnInit(): void {
        this.backwardButtonSubject
            .asObservable()
            .pipe(mergeMap((bHideBackward: boolean) => {
                this.hideButtonBackward = bHideBackward;
                return this.forwardButtonSubject.asObservable();
            }))
            .subscribe((bHideForward: boolean) => {
                this.hideButtonForward = bHideForward;
            });;
    }

    hasChildrenCategories(): boolean {
        return this.hideButtonForward;
    }

    isRootCategory(): boolean {
        return this.hideButtonBackward;
    }

    seeChildrenCategories(): void {
        console.log('Go to children categories');
        this.categoriesToSee = this.categories.filter(c => this.checkCategoryParentIs(c, this.selectedCategory));
        this.selectedCategory = this.categoriesToSee[0];
        this.entry.category = this.selectedCategory;
        this.checkMustShowButtonsAccordingTo(this.selectedCategory);

    }

    backToParent(): void {
        console.log('Go back to parent list of categories');
        this.categoriesToSee = this.categories.filter(c => this.checkIfIsSisterCategoryOrRoot(c));
        this.selectedCategory = this.selectedCategory.parent;
        this.entry.category = this.selectedCategory;
        this.checkMustShowButtonsAccordingTo(this.selectedCategory);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.categories) {
            this.categories = changes.categories.currentValue;
            this.categoriesToSee = this.categories.filter(c => c.parent === null);
            this.checkMustShowButtonsAccordingTo(this.entry.category);
        }
    }

    changeSelectedCategory(event: any): void {
        this.assignCurrentCategoryToSelectedOption(event);
        this.checkMustShowButtonsAccordingTo(this.selectedCategory);
        this.entry.category = this.selectedCategory;
    }

    private checkCategoryIs(expenseCategory: ExpenseCategory, categoryType: CategoryType): boolean {
        if (categoryType === CategoryType.CHILD) {
            return expenseCategory.parent !== null;
        } else {
            return expenseCategory.parent === null;
        }
    }

    private checkCategoryParentIs(expenseCategory: ExpenseCategory, parent: ExpenseCategory): boolean {
        return expenseCategory.parent !== null && expenseCategory.parent.name === parent.name;
    }

    private checkCategoryHasChildren(expenseCategory: ExpenseCategory): boolean {
        return !!this.categories.find(c => this.checkCategoryIs(c, CategoryType.CHILD) && this.checkCategoryParentIs(c, expenseCategory));
    }

    private checkIfIsSisterCategoryOrRoot(expenseCategory: ExpenseCategory): boolean {
        return (expenseCategory.level === this.selectedCategory.parent.level &&
                (this.checkCategoryParentIs(expenseCategory, this.selectedCategory.parent.parent) || expenseCategory.level === 1))
    }    

    private assignCurrentCategoryToSelectedOption(optionEvent: any): void {
        this.selectedCategory = this.categories.find(c => c.name === optionEvent.target.value);
    }

    private checkMustShowButtonsAccordingTo(expenseCategory: ExpenseCategory): void {
        this.backwardButtonSubject.next(this.checkCategoryIs(expenseCategory, CategoryType.ROOT));
        this.forwardButtonSubject.next(this.checkCategoryHasChildren(expenseCategory));
    }

}
