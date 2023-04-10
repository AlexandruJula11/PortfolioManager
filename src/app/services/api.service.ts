import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Portfolio} from "../shared/portfolio.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:3000/enquiry';
  constructor(private http: HttpClient) {

  }

  postCreatedPortfolio(createdObj: Portfolio) {
    return this.http.post<Portfolio>(`${this.baseUrl}`, createdObj);
  }
  getCreatedPortfolio() {
    return this.http.get<Portfolio[]>(`${this.baseUrl}`);
  }

  updateCreatedPortfolio(createdObj: Portfolio, id: number) {
    return this.http.put<Portfolio>(`${this.baseUrl}/${id}`, createdObj);
  }

  deleteCreatedPortfolio(id: number) {
    return this.http.delete<Portfolio>(`${this.baseUrl}/${id}`);
  }

  getCreatedPortfolioID(id: number) {
    return this.http.get<Portfolio>(`${this.baseUrl}/${id}`);
  }
}
