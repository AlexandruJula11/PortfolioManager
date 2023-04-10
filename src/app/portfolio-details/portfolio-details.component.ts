import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Portfolio} from "../shared/portfolio.model";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent implements OnInit{

  portfolioID!: number;
  portfolioDetails! : Portfolio;

  @ViewChild('imageRef', {static: false}) imageRef!: ElementRef
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {

    this.imageRef.nativeElement.styles.backgroundImage = "";
    this.activatedRoute.params.subscribe(val =>{
    this.portfolioID = val['id'];
    this.fetchPortfolioDetails(this.portfolioID);
    })
  }

  fetchPortfolioDetails(portfolioID: number) {
    this.api.getCreatedPortfolioID(portfolioID)
      .subscribe(res => {
        this.portfolioDetails = res;
        console.log(this.portfolioDetails);
      })
  }
}
