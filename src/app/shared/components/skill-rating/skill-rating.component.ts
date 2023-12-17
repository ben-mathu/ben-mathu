import { Component, Input } from '@angular/core';
import { Skill } from '../../models/header/header';

@Component({
  selector: 'skill-rating',
  templateUrl: './skill-rating.component.html',
  styleUrl: './skill-rating.component.scss'
})
export class SkillRatingComponent {
  @Input() myInfo!: Skill;

  calculatePercentage(rate: string) {
    return Number(rate) / 10 * 100;
  }
}
