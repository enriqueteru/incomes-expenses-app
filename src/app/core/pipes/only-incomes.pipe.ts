import { Pipe, PipeTransform } from '@angular/core';
import { IncomesExpenses } from '../models/incomes-expenses.model';

@Pipe({
  name: 'onlyIncomes'
})
export class OnlyIncomesPipe implements PipeTransform {
  transform(items: IncomesExpenses[]): IncomesExpenses[] {
    return items.filter( a => a.type === 'income' )
    }

}
