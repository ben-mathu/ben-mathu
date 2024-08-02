import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BlogElement } from 'src/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { Utils } from 'src/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  blogs: BlogElement[] = [];
  selectedRow!: BlogElement;
  displayedColumns = ['index', 'dateCreated', 'dateUpdated'];

  constructor(
    private firebaseService: FirebaseService,
    private breadcrumbService: BreadcrumbService,
    private snackbar: MatSnackBar,
    private util: Utils
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Blogs', 'Blogs');

    const horizontalPos: MatSnackBarHorizontalPosition = 'end';
    const verticalPos: MatSnackBarVerticalPosition = 'bottom';

    this.firebaseService
      .getAllBlogs()
      .then((values) => {
        this.blogs = values;
      })
      .catch((error: Error) => {
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(blogDetails: { rowData: BlogElement; event: Event }) {
    this.selectedRow = blogDetails['rowData'];
  }
}
