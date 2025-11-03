import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { of } from 'rxjs';
import { SalesByRegionComponent } from './sales-by-region.component';
import { SalesByRegionService } from './sales-by-region.service';

describe('SalesByRegionComponent', () => {
  let fixture: any;
  let component: SalesByRegionComponent;

  const mockSvc = {
    getRegions: jasmine.createSpy('getRegions').and.returnValue(of(['North','South'])),
    getByRegion: jasmine.createSpy('getByRegion').and.returnValue(of([
      { salesperson: 'Jane', total: 1200 },
      { salesperson: 'John', total: 800 }
    ]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesByRegionComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: SalesByRegionService, useValue: mockSvc }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit -> loads regions & first region data
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('loads regions on init and selects first region', () => {
    expect(mockSvc.getRegions).toHaveBeenCalled();
    expect(component.regions()).toEqual(['North','South']);
    expect(component.selected()).toBe('North');
    expect(mockSvc.getByRegion).toHaveBeenCalledWith('North');
  });

  it('toggles between chart and table views', () => {
    expect(component.view()).toBe('chart');
    component.toggleView();
    expect(component.view()).toBe('table');
  });
});
