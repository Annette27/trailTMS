import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerlistComponent } from './trainerlist.component';

describe('TrainerlistComponent', () => {
  let component: TrainerlistComponent;
  let fixture: ComponentFixture<TrainerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
