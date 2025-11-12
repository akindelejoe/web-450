import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../../shared/chart/chart.component'; 

@Component({
  selector: 'app-agent-performance-by-feedback',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './agent-performance-by-feedback.component.html',
  styleUrls: ['./agent-performance-by-feedback.component.css']
})
export class AgentPerformanceByFeedbackComponent implements OnInit {
  labels: string[] = ['Positive', 'Neutral', 'Negative'];
  data: number[] = [60, 25, 15];

  constructor() {}

  ngOnInit(): void {}
}
