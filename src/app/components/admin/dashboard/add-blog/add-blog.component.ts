import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { BlogElement } from 'src/shared/models/header/portfolio.dto';
import { BlogDetails } from 'src/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})
export class AddBlogComponent implements OnInit {
  @Input() selectedRow!: BlogElement;

  blogTitleLabel: string = "Article";
  blogAuthorLabel: string = "Author";
  blogTextLabel: string = "Blog";
  tagsLabel: string = "Tags";
  addBlogForm!: FormGroup;

  tags: string[] = [];

  constructor(private firebaseService: FirebaseService, private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.breadcrumbService.set("@AddBlog", "Add Blog");

    this.addBlogForm = this.formBuilder.group({
      title: [this.selectedRow ? this.selectedRow.title : '', Validators.required],
      author: [this.selectedRow ? this.selectedRow.author : '', Validators.required],
      text: [this.selectedRow ? this.selectedRow.blog : '', Validators.required],
      tags: ['']
    });

    this.tags = this.selectedRow ? this.selectedRow.tags : [];
  }

  get f() { return this.addBlogForm.controls };

  formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions[] = [{year: "numeric"}, {month: "numeric"}, {day: "numeric"}];

    return options.map((option) => {
      const formatter = new Intl.DateTimeFormat('en', option);
      return formatter.format(date);
    }).join(' ');
  }

  add() {
    const blog: BlogDetails = {
      title: this.f['title'].value,
      author: this.f['author'].value,
      blog: this.f['text'].value,
      tags: this.tags,
      dateCreated: this.selectedRow ? this.selectedRow.dateCreated : this.formatDate(new Date()),
      dateUpdated: this.formatDate(new Date())
    }

    if (this.selectedRow) {
      this.firebaseService.updateBlog(blog, this.selectedRow.key);
    } else {
      this.firebaseService.saveBlog(blog);
      this.router.navigate(['admin', 'dashboard', 'blogs']);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tags, event.previousIndex, event.currentIndex);
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const index: number = this.tags.indexOf(tag, 0);
    const changedValue: string = event.value.trim();

    if (!changedValue) {
      this.remove(tag);
      return;
    }

    if (index > -1) {this.tags[index] = changedValue}
  }

  remove(tag: string) {
    const index: number = this.tags.indexOf(tag, 0);
    if (index > -1) {
      this.tags.splice(index, 1);

      if (this.tags.length > 0) {
        this.f['tags'].setValue(' ');
      } else {
        this.f['tags'].setValue('');
      }
    }
  }

  onChange(event: Event) {
    const inputEvent = event as InputEvent;
    let value = (event.target as HTMLInputElement)?.value;
    if (inputEvent.inputType === 'insertText' && inputEvent.data === ',') {
      value = value.substring(0, value.length - 1);

      if (this.tags.includes(value)) {
        return;
      }

      this.tags.push(value);

      this.f['tags'].setValue(' ');
    } else if (inputEvent.inputType === 'deleteContentBackward' && value === '') {
      this.tags.pop();

      if (this.tags.length > 0) {
        this.f['tags'].setValue(' ');
      }
    }
  }

  delete() {
    this.firebaseService.deleteBlog(this.selectedRow.key);
  }
}
