import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ServiceService } from '../service/service.service';

interface ProductoPorCategoria {
  categoria: string;
  cantidad_productos: number;
}

@Component({
  selector: 'app-admin-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.scss']
})
export class AdminEstadisticasComponent implements AfterViewInit {
  @ViewChild('chart') chart: ElementRef;

  constructor(private serviceService: ServiceService) {
    this.chart = {} as ElementRef;
  }

  ngAfterViewInit() {
    this.serviceService.getProductosPorCategoria().subscribe(
      (data: ProductoPorCategoria[]) => {
        console.log('Data received:', data);
        // Verificar si la respuesta es un arreglo de objetos
        if (Array.isArray(data) && data.every(item => typeof item === 'object')) {
          // Procesar los datos y renderizar el gráfico
          const options = {
            series: data.map(item => item.cantidad_productos),
            labels: data.map(item => item.categoria),
            chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          };
          const chart = new ApexCharts(this.chart.nativeElement, options);
          chart.render();
        } else {
          console.error('Invalid data format:', data);
          // Manejar el caso en el que la respuesta no es un arreglo de objetos
        }
      },
      error => {
        console.error('Error fetching data:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }
}
