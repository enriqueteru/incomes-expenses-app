import { Pipe, PipeTransform } from '@angular/core';
import { IncomesExpenses } from '../models/incomes-expenses.model';

@Pipe({
  name: 'sortList',
})
export class SortListPipe implements PipeTransform {
  transform(items: IncomesExpenses[]): IncomesExpenses[] {
    return items.slice().sort((a,b) => {
      return a.type > b.type ? -1 : 1
    });

  }
}
