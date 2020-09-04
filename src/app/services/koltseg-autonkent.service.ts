import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';


@Injectable({
  providedIn: 'root'
})
export class KoltsegAutonkentService {

  canvas: any;
  ctx: any;


  constructor(private http:HttpClient) { }

  KoltsegAutonkent() {
    this.http.get('http://www.priestago.hu/php/auto/KoltsegAutonkent.php').subscribe(cdata => {

			this.canvas = document.getElementById('pie-chart');
			this.ctx = this.canvas.getContext('2d');

			let pie_chart = new Chart(this.ctx, {
				type: 'doughnut',
        indexLabelPlacement: "outside",
				radius:  "100", 
				innerRadius: "100%",
        animationEnabled: true,
        animationSteps: 200,
				data: {
					labels: ['NES893', 'NTV495', 'RVP859', 'RXE970'],
					datasets: [{
					label: "Költség (Forint)",
					backgroundColor: ["#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
					data: cdata
				  }]
				},
				options: {
				  title: {
					display: true,
					text: 'Költség autónként'
				  },
				}
			});
	
    }, error => console.error(error));

  }
}
