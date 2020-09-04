import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as Chart from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class KoltsegekTipusonkentService {

  canvas: any;
  ctx: any;

  xxx: any = [];
  nevek: any = [];
  adatok: any = [];
  params = new HttpParams();

  constructor(private http:HttpClient) { }

  KoltsegekTipusonkent(selected) {

    if (selected == 'option1') {
      this.params = this.params.append('start', '2019-01-01');
      this.params = this.params.append('end', '2020-12-31' );
    }else if (selected == 'option2'){
      this.params = this.params.append('start', '2019-01-01');
      this.params = this.params.append('end', '2019-12-31' );
    }else if (selected == 'option3'){
      this.params = this.params.append('start', '2020-01-01');
      this.params = this.params.append('end', '2020-12-31' );
    }
    
    this.xxx = [];
    this.nevek = [];
    this.adatok = [];
		this.http.get('http://priestago.hu/php/auto/KoltsegekTipusonkent.php', { params: this.params } ).subscribe(cdata => {
			this.xxx.push(cdata);
			for (var i = 0; i < this.xxx[0].length; i++){
				this.nevek.push(this.xxx[0][i].nev);
				this.adatok.push(this.xxx[0][i].osszeg);
			}
			
			this.canvas = document.getElementById('myChart');
			this.ctx = this.canvas.getContext('2d');
			let myChart = new Chart(this.ctx, {
				type: 'bar',
				data: {
					labels: this.nevek,
					datasets: [{
						label: 'Típus',
						data: this.adatok,
						backgroundColor: "lightblue",
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

  }

}
