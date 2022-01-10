import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionManagementPageComponent } from './question-management-page.component';

describe('QuestionManagementPageComponent', () => {
  let component: QuestionManagementPageComponent;
  let fixture: ComponentFixture<QuestionManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
