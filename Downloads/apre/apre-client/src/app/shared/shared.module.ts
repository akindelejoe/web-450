/**
 * Author: Joe Akindele
 * Date: 11/09/2025
 * File: shared.module.ts
 * Description: Shared module that makes shared components (like ChartComponent)
 * available throughout the application.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule],
  exports: [ChartComponent]
})
export class SharedModule {}
