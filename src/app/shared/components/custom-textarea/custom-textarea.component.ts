import { Component, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import '@github/markdown-toolbar-element';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrl: './custom-textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextareaComponent),
      multi: true
    }
  ]
})
export class CustomTextareaComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() switchEditorToolbar: boolean = false;
  @Input() _text: string = '';

  get text() {
    return this._text;
  }

  set text(val: string) {
    this._text = val;
    this.propagateChange(this._text);
  }

  propagateChange = (value: any) => {}

  onTextChanged(event: Event) {
    this.text = (event.target as HTMLInputElement)?.value;
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {this.text = obj as string;}
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
