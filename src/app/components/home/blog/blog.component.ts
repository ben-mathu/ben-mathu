import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BlogElement, ExperienceElement, ProjectElement } from 'src/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-blog.full-width',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  experiences?: ExperienceElement[];
  projects?: ProjectElement[];
  articles?: BlogElement[];
  
  experience?: ExperienceElement;
  project?: ProjectElement;
  article?: BlogElement;

  blogList: Map<string, string>[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private service: FirebaseService, private activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.breadcrumbService.set('@Blog', 'Blog');
    this.activatedRoute.params.subscribe(async params => {
      let id = params['id'];
    
      this.experiences = await this.service.getAllExperiences();
      this.setExperience(id);

      this.projects = await this.service.getAllProjects();
      this.setProject(id);

      this.articles = await this.service.getAllBlogs();
      this.setBlog(id);

      if (!this.experience || !this.project || !this.article) {
        this.showMessage('Article not found');
      }
    });
  }

  searchForBlog(id?: string): void {
    if (id) {
      this.setExperience(id);
  
      this.setProject(id);
  
      this.setBlog(id);
    } else {
      this.showMessage('Article not found');
    }
  }

  setBlog(id: string) {
    this.articles?.map((article) => {
      if (article.key === id) {
        this.article = article;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set('@Blog', 'Blog :: ' + article.title);
      }

      const blogMap: Map<string, string> = new Map<string, string>()
      blogMap.set('title', 'Article:' + article.title);
      blogMap.set('key', article.key);

      this.blogList.push(blogMap);
    });
  }

  setProject(id: string) {
    this.projects?.map((project) => {
      if (project.key === id) {
        this.project = project;
        this.article = undefined;
        this.experience = undefined;
        this.breadcrumbService.set('@Blog', 'Projects :: ' + project.projectName);
      }

      const blogMap: Map<string, string> = new Map<string, string>()
      blogMap.set('title', 'Project:' + project.projectName);
      blogMap.set('key', project.key);

      this.blogList.push(blogMap);
    });
  }

  setExperience(id: string): void {
    this.experiences?.map((experience) => {
      if (experience.key === id) {
        this.experience = experience;
        this.project = undefined;
        this.article = undefined;
        this.breadcrumbService.set('@Blog', 'Experience :: ' + experience.title);
      }
      
      const blogMap: Map<string, string> = new Map<string, string>()
      blogMap.set('title', 'Experience:' + experience.title);
      blogMap.set('key', experience.key);
  
      this.blogList.push(blogMap);
    });
  }

  showMessage(message: string): void {
    const horizontalPos: MatSnackBarHorizontalPosition = 'end';
    const verticalPos: MatSnackBarVerticalPosition = 'bottom';
    this.snackbar.open(message, 'Ok',
      {
        horizontalPosition: horizontalPos,
        verticalPosition: verticalPos,
        duration: 5000
      }
    );
  }
}

