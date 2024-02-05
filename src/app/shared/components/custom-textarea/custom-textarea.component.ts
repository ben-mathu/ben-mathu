import { Component, Input } from '@angular/core';
import { ExperienceElement, ProjectElement } from '../../models/header/portfolio.dto';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrl: './custom-textarea.component.scss'
})
export class CustomTextareaComponent {
  @Input() descriptionLabel!: string;
  @Input() text!: string;
  @Input() group!: FormGroup;
}
