import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {ApiService} from "../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Portfolio} from "../shared/portfolio.model";

@Component({
  selector: 'app-create-portfolio',
  templateUrl: './create-portfolio.component.html',
  styleUrls: ['./create-portfolio.component.scss']
})
export class CreatePortfolioComponent implements OnInit {
  visibilityOptions: string[] = ["Hidden", "Visible"];

  public createForm!: FormGroup;
  public portfolioIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      customerWebsiteURL: ['', [Validators.required, Validators.pattern('^(https:\/\/www\.|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]],
      imageURL: ['', [Validators.required, Validators.pattern('^(https:\/\/www\.|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')] ],
      visibilityOption: ['']
    })

    this.activatedRoute.params.subscribe(val => {
      this.portfolioIdToUpdate = val['id'];
      this.api.getCreatedPortfolioID(this.portfolioIdToUpdate)
        .subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(res);
        })
    })
  }

  onSubmit() {
    this.api.postCreatedPortfolio(this.createForm.value).subscribe(
      res => {
        this.toastService.success({detail:"Success", summary: "Added", duration: 3000});
        this.createForm.reset();
      }
    );
  }

  fillFormToUpdate(portfolio: Portfolio){
    this.createForm.patchValue({
      username: portfolio.username,
      title: portfolio.title,
      email: portfolio.email,
      customerWebsiteURL: portfolio.customerWebsiteURL,
      imageURL: portfolio.imageURL
    })
  }

  onUpdate() {
    this.api.updateCreatedPortfolio(this.createForm.value, this.portfolioIdToUpdate).subscribe(
      res => {
        this.toastService.success({detail:"Success", summary: "Updated", duration: 3000});
        this.createForm.reset();
        this.router.navigate(['portfolios-list']);
      }
    );
  }
}
