import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import '@github/markdown-toolbar-element';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrl: './custom-textarea.component.scss'
})
export class CustomTextareaComponent {
  @Input() descriptionLabel!: string;
  @Input() text!: string;
  @Input() group!: FormGroup;

  onTextChanged(event: Event) {
    this.text = (event.target as HTMLInputElement)?.value
  }
}
