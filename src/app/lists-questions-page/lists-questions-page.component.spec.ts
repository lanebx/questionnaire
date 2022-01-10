import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsQuestionsPageComponent } from './lists-questions-page.component';

describe('ListsQuestionsPageComponent', () => {
  let component: ListsQuestionsPageComponent;
  let fixture: ComponentFixture<ListsQuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsQuestionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
