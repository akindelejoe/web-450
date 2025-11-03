import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalesRow {
  salesperson: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesByRegionService {
  private readonly baseUrl = '/api/reports/sales';

  constructor(private http: HttpClient) {}

  // Fetch all distinct sales regions
  getRegions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/regions`);
  }

  // Fetch sales by a specific region
  getByRegion(region: string): Observable<SalesRow[]> {
    return this.http.get<SalesRow[]>(`${this.baseUrl}/by-region/${region}`);
  }
}
