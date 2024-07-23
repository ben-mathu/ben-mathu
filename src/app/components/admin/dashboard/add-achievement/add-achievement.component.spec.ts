import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAchievementComponent } from './add-achievement.component';

describe('AddAchievementComponent', () => {
  let component: AddAchievementComponent;
  let fixture: ComponentFixture<AddAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAchievementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
