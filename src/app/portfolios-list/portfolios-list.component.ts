import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Portfolio} from "../shared/portfolio.model";
import {MatPaginator} from "@angular/material/paginator";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {NgConfirmService} from "ng-confirm-box"
import {NgToastService} from "ng-angular-popup";
@Component({
  selector: 'app-portfolios-list',
  templateUrl: './portfolios-list.component.html',
  styleUrls: ['./portfolios-list.component.scss']
})
export class PortfoliosListComponent implements OnInit{

  dataSource!: MatTableDataSource<Portfolio> ;
  portfolios!: Portfolio[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['id', 'username', 'title', 'email', 'customerWebsiteURL', 'imageURL', 'action'];

  constructor(
    private api: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toastService: NgToastService
  ) {

  }

  ngOnInit() {
    this.getPortfolios();
  }

  getPortfolios() {
    this.api.getCreatedPortfolio()
    .subscribe(res =>{
      this.portfolios = res;
      this.dataSource = new MatTableDataSource(this.portfolios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  delete(id: number){
    this.confirm.showConfirm("Are you sure?",
      () => {
        this.api.deleteCreatedPortfolio(id)
          .subscribe(res => {
            this.toastService.success({detail:"Success", summary: "Deleted", duration: 3000});
            this.getPortfolios();
          })
      },
      () => {

      }
      )

  }
}
