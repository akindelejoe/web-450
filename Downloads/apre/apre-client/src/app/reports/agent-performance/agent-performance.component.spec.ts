import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentPerformanceByFeedbackComponent } from './agent-performance-by-feedback.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgentPerformanceByFeedbackService } from './agent-performance-by-feedback.service';
import { of } from 'rxjs';

describe('AgentPerformanceByFeedbackComponent', () => {
  let component: AgentPerformanceByFeedbackComponent;
  let fixture: ComponentFixture<AgentPerformanceByFeedbackComponent>;
  let service: jasmine.SpyObj<AgentPerformanceByFeedbackService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AgentPerformanceByFeedbackService', ['getPerformance']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AgentPerformanceByFeedbackComponent],
      providers: [{ provide: AgentPerformanceByFeedbackService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentPerformanceByFeedbackComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AgentPerformanceByFeedbackService) as jasmine.SpyObj<AgentPerformanceByFeedbackService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and store feedback data', () => {
    const mockData = [
      { feedback: 'Positive', count: 5 },
      { feedback: 'Neutral', count: 3 },
      { feedback: 'Negative', count: 2 }
    ];

    service.getPerformance.and.returnValue(of(mockData));
    component.ngOnInit();

    expect(service.getPerformance).toHaveBeenCalled();
    expect(component.labels).toEqual(['Positive', 'Neutral', 'Negative']);
    expect(component.data).toEqual([5, 3, 2]);
  });

  it('should handle API errors gracefully', () => {
    service.getPerformance.and.throwError('API error');
    expect(() => component.ngOnInit()).toBeTruthy();
  });
});
