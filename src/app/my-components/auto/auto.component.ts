import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { KoltsegekTipusonkentService } from "../../services/koltsegek-tipusonkent.service";
import { KoltsegAutonkentService } from "../../services/koltseg-autonkent.service";
import { MatSort, MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";

export interface PeriodicElement {
  nev: string;
  osszeg: number;
}

@Component({
  selector: "app-auto",
  templateUrl: "./auto.component.html",
  styleUrls: ["./auto.component.css"],
})
export class AutoComponent implements OnInit {
  canvas: any;
  ctx: any;

  cdata: any = [];

  params = new HttpParams();
  submitted = false;
  selected = "option3";

  xxx: any = [];

  ELEMENT_DATA: any;
  displayedColumns: string[] = ["nev", "osszeg"];
  dataSource: any = {};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private http: HttpClient,
    private kotsegekTipusonkent: KoltsegekTipusonkentService,
    private koltsegAutonkent: KoltsegAutonkentService
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.koltsegAutonkent.KoltsegAutonkent();
    this.kotsegekTipusonkent.KoltsegekTipusonkent(this.selected);
    this.tablazat(this.selected);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange() {
    this.kotsegekTipusonkent.KoltsegekTipusonkent(this.selected);
    this.tablazat(this.selected);
  }

  tablazat(sel) {
    if (sel == "option1") {
      this.params = this.params.append("start", "2019-01-01");
      this.params = this.params.append("end", "2020-12-31");
    } else if (sel == "option2") {
      this.params = this.params.append("start", "2019-01-01");
      this.params = this.params.append("end", "2019-12-31");
    } else if (sel == "option3") {
      this.params = this.params.append("start", "2020-01-01");
      this.params = this.params.append("end", "2020-12-31");
    }

	this.xxx = [];

    this.http.get("http://priestago.hu/php/auto/KoltsegekTipusonkent.php", {params: this.params}).subscribe(
        (cdata) => {
          this.xxx.push(cdata);
          this.ELEMENT_DATA = this.xxx[0];
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => console.error(error)
      );
  }
}
