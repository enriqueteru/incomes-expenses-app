import { Pipe, PipeTransform } from '@angular/core';
import { IncomesExpenses } from '../models/incomes-expenses.model';

@Pipe({
  name: 'onlyExpenses'
})
export class OnlyExpensesPipe implements PipeTransform {
  transform(items: IncomesExpenses[]): IncomesExpenses[] {
  return items.filter( item => item.type === 'expense' )
  }

}
