/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: agent-performance.component.ts
 * Description: Agent performance component
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentPerformanceByFeedbackComponent } from './agent-performance-by-feedback/agent-performance-by-feedback.component';

@Component({
  selector: 'app-agent-performance',
  standalone: true,
  imports: [CommonModule, AgentPerformanceByFeedbackComponent],
  templateUrl: './agent-performance.component.html',
  styleUrls: ['./agent-performance.component.css']
})
export class AgentPerformanceComponent {}
