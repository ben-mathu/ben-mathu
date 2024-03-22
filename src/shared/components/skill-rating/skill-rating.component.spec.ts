import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillRatingComponent } from './skill-rating.component';

describe('SkillRatingComponent', () => {
  let component: SkillRatingComponent;
  let fixture: ComponentFixture<SkillRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
