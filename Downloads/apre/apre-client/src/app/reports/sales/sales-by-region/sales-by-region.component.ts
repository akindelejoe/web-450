import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesByRegionService } from './sales-by-region.service';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { TableComponent } from '../../../shared/table/table.component';

@Component({
  selector: 'app-sales-by-region',
  standalone: true,
  imports: [CommonModule, ChartComponent, TableComponent],
  templateUrl: './sales-by-region.component.html',
  styleUrls: ['./sales-by-region.component.css']
})
export class SalesByRegionComponent implements OnInit {
  regions = signal<string[]>([]);
  selected = signal<string | null>(null);
  rows = signal<{ salesperson: string; total: number }[]>([]);
  view = signal<'chart' | 'table'>('chart');

  constructor(private api: SalesByRegionService) {}

  ngOnInit() {
    this.api.getRegions().subscribe(list => {
      this.regions.set(list);
      if (list.length) this.onSelect(list[0]);
    });
  }

  onSelect(region: string) {
    this.selected.set(region);
    this.api.getByRegion(region).subscribe(data => this.rows.set(data));
  }

  toggleView() {
    this.view.set(this.view() === 'chart' ? 'table' : 'chart');
  }

  get labels() {
    return this.rows().map(r => r.salesperson);
  }

  get data() {
    return this.rows().map(r => r.total);
  }
}
