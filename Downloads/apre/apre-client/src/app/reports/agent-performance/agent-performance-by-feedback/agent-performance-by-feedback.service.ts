import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AgentFeedbackRow {
  agent: string;
  positive: number;
  negative: number;
  average: number;
}


@Injectable({
  providedIn: 'root'
})
export class AgentPerformanceByFeedbackService {
  private apiUrl = 'http://localhost:3000/api/reports/agent-performance/performance-by-feedback';

  constructor(private http: HttpClient) {}

  getPerformance(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`);
  }
}
