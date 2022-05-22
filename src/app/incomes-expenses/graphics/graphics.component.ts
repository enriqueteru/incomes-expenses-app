import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { filter, map } from 'rxjs';
import { IncomesExpenses } from 'src/app/core/models/incomes-expenses.model';
import { IncomesExpensesService } from 'src/app/core/services/incomes-expenses.service';
import { AppState } from 'src/app/core/state/reducers/app.reducer';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styles: [],
})
export class GraphicsComponent implements OnInit {
  incomes: number = 0;
  expenses: number = 0;

  totalIncomes: number = 0;
  totalExpenses: number = 0;

  public doughnutChartLabels: string[] = [
'Expenses', 'Incomes',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ],
  };


  constructor(private _ie: IncomesExpensesService) {}

  ngOnInit() {
    this._ie
      .ieSelector()
      .pipe(map(({ items }) => items))
      .subscribe((ie) => this.GenerateGraphic(ie));
  }

  GenerateGraphic(items: IncomesExpenses[]) {
    for (const i of items) {
      if (i.type === 'income') {
        this.totalIncomes += i.amount;
        this.incomes++;
      } else {
        this.totalExpenses += i.amount;
        this.expenses++;
      }
    }
    this.doughnutChartData.datasets =  [
      { data: [this.totalExpenses,this.totalIncomes] },
    ]
  }
}
