import { Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { bindCallback } from 'rxjs';
import * as Chart from 'chart.js';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

declare var require: any;

const data: any = require('./data.json');

export interface PeriodicElement {
	nev: string;
	osszeg: number;
  }

  export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

	canvas: any;
	ctx: any;

	cdata: any = [];
	xxx = [];
	yyy = [];

	nevek: any = [];
	adatok: any = [];

	tol: any;
	ig: any;

	users: any = [];

	params = new HttpParams();

	baseUrl : string = 'http://priestago.hu/php/tarca/koltsegcsoportosszesen.php';

	donuteChart1: any = {};

	constructor(private http:HttpClient){}

	ELEMENT_DATA: any;
	displayedColumns: string[] = ['nev', 'osszeg'];
	dataSource: any = {};
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	ngOnInit() {

		
		this.params = this.params.append('start', '2020-01-01');
		this.params = this.params.append('end', '2020-12-31' );
		
		this.http.get(this.baseUrl, { params: this.params } ).subscribe(cdata => {
			this.xxx.push(cdata);
			for (var i = 0; i < this.xxx[0].length; i++){
				this.nevek.push(this.xxx[0][i].nev);
				this.adatok.push(this.xxx[0][i].osszeg);
			}
			
			this.ELEMENT_DATA = this.xxx[0];

			this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;

			this.canvas = document.getElementById('myChart');
			this.ctx = this.canvas.getContext('2d');
			let myChart = new Chart(this.ctx, {
				type: 'bar',
				data: {
					labels: this.nevek,
					datasets: [{
						label: 'Költség csoport',
						data: this.adatok,
						backgroundColor: ["lightgreen", "lightblue", "orange"],
						borderWidth: 1
					}]
				},
				options: {
				    scales: {
						xAxes: [{
							stacked: true,
							gridLines: {
								offsetGridLines: true
							},
							ticks: {
								beginAtZero: true
							}
						}],
						yAxes: [
							{
							  ticks: {
								beginAtZero: true
							  }
							}
						]
					},
					legend: {
						display: true
					},
					responsive: true,
					display:true
				}
			});
	
		}, error => console.error(error));

		this.http.get('http://localhost/php/auto/RendszamKoltsegOsszesen_materialpie.php').subscribe(cdata => {

			this.canvas = document.getElementById('pie-chart');
			this.ctx = this.canvas.getContext('2d');

			console.log(cdata)

			let pie_chart = new Chart(this.ctx, {
				type: 'doughnut',
				indexLabelPlacement: "outside",
				radius:  "40", 
				innerRadius: "40%",
				animationEnabled: true,
				data: {
					labels: ['Gluténmentes', 'Tejmentes', 'Vegán', 'Cukormentes'],
					datasets: [{
					label: "Költség (Forint)",
					backgroundColor: ["#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
					data: cdata
				  }]
				},
				options: {
				  title: {
					display: true,
					text: 'Költség megoszlás'
				  },
				}
			});

			this.donuteChart1 = {
				type: 'Pie',
				data: {
					labels: ['Gluténmentes', 'Tejmentes', 'Vegán', 'Cukormentes'],
					series: cdata
				},
				options: {
					donut: false,
					height: 260,
					showLabel: true,
					donutWidth: 50,
					labels: {
						// This more specific font property overrides the global property
						fontColor: 'black'
					},
				}
			};
	
		}, error => console.error(error));

	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	
		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
		}
	  }

	// Barchart
	barChart1: Chart = {
		type: 'Bar',
		data: data['Bar'],
		options: {
			seriesBarDistance: 15,
			high: 12,

			axisX: {
				showGrid: false,
				offset: 20
			},
			axisY: {
				showGrid: true,
				offset: 40
			},
			height: 300
		},

		responsiveOptions: [
			[
				'screen and (min-width: 640px)',
				{
					axisX: {
						labelInterpolationFnc: function(
							value: number,
							index: number
						): string {
							return index % 1 === 0 ? `${value}` : null;
						}
					}
				}
		
			]
		]
	};
	
}


  


