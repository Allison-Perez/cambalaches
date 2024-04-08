import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ServiceService } from '../service/service.service';

interface ProductoPorCategoria {
  categoria: string;
  cantidad_productos: number;
}

interface ProductoPorEstado {
  estado: string;
  cantidad_productos: number;
}

interface ProductoPorUsuario {
  nombreUsuario: string;
  cantidad_productos: number;
  primerNombre: string;
}

@Component({
  selector: 'app-admin-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.scss']
})
export class AdminEstadisticasComponent implements AfterViewInit {
  @ViewChild('chart') chart: ElementRef;
  @ViewChild('estadoChart') estadoChart: ElementRef;
  @ViewChild('usuarioChart') usuarioChart: ElementRef;

  constructor(private serviceService: ServiceService) {
    this.chart = {} as ElementRef;
    this.estadoChart = {} as ElementRef;
    this.usuarioChart = {} as ElementRef;
  }

  ngAfterViewInit() {
    this.serviceService.getProductosPorCategoria().subscribe(
      (data: ProductoPorCategoria[]) => {
        if (Array.isArray(data) && data.every(item => typeof item === 'object')) {
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
          console.error('Invalid data format (Productos por Categoría):', data);
        }
      },
      error => {
        console.error('Error fetching data (Productos por Categoría):', error);
      }
    );

    this.serviceService.getProductosPorEstado().subscribe(
      (data: ProductoPorEstado[]) => {
        if (Array.isArray(data) && data.every(item => typeof item === 'object')) {
          const options = {
            series: [{
              data: data.map(item => item.cantidad_productos)
            }],
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            xaxis: {
              categories: data.map(item => item.estado),
            },
            colors: ['#FADBD8']
          };
          const chart = new ApexCharts(this.estadoChart.nativeElement, options);
          chart.render();
        } else {
          console.error('Invalid data format (Productos por Estado):', data);
        }
      },
      error => {
        console.error('Error fetching data (Productos por Estado):', error);
      }
    );

    this.serviceService.getProductosPorUsuario().subscribe(
      (data: ProductoPorUsuario[]) => {
        console.log('Data received (Productos por Usuario):', data);

        // Verificar si los datos son un arreglo de objetos y cada objeto tiene la propiedad primerNombre
        if (Array.isArray(data) && data.every(item => typeof item === 'object' && 'primerNombre' in item)) {
          const options = {
            series: [{
              name: 'Cantidad de productos',
              data: data.map(item => item.cantidad_productos)
            }],
            chart: {
              type: 'line', // Cambiar el tipo de gráfico a 'line'
              height: 350
            },
            markers: {
              size: 5,
              colors: ['#D2B4DE'],
              strokeColors: '#fff',
              strokeWidth: 2,
              hover: {
                size: 7,
              }
            },
            xaxis: {
              categories: data.map(item => item.primerNombre),
            },
            colors: ['#D2B4DE']
          };

          // Renderizar el gráfico
          const chart = new ApexCharts(this.usuarioChart.nativeElement, options);
          chart.render();
        } else {
          console.error('Invalid data format (Productos por Usuario):', data);
        }
      },
      error => {
        console.error('Error fetching data (Productos por Usuario):', error);
      }
    );




  }
}
