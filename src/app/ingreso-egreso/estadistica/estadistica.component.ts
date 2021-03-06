import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos: number
  egresos: number

  cuantosIngresos: number
  cuantosEgresos: number

  subscripcion: Subscription = new Subscription()

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  public doughnutChartType = 'doughnut';

  
  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items)
    })
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0
    this.egresos = 0

    this.cuantosEgresos = 0
    this.cuantosIngresos = 0

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cuantosIngresos++
        this.ingresos += item.monto
      } else {
        this.cuantosEgresos++
        this.egresos += item.monto
      }
    })

    this.doughnutChartData = [
      this.ingresos, this.egresos
    ]
  }

}
