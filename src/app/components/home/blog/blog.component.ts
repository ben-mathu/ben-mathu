import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  AchievementElement,
  BlogElement,
  CertificateElement,
  ExperienceElement,
  ProjectElement,
} from 'src/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { showSnackBar } from 'src/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-blog.full-width',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  experiences?: ExperienceElement[];
  projects?: ProjectElement[];
  articles?: BlogElement[];
  achievements?: AchievementElement[];
  certificates?: CertificateElement[];

  experience?: ExperienceElement;
  project?: ProjectElement;
  article?: BlogElement;
  achievement?: AchievementElement;
  certificate?: CertificateElement;

  blogList: Map<string, string>[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private service: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Blog', 'Blog');
    this.activatedRoute.params.subscribe(async (params) => {
      let id = params['id'];

      try {
        this.experiences = await this.service.getAllExperiences();
        this.setExperience(id);
      } catch (error) {
        showSnackBar('experience not found', this.snackbar);
      }

      try {
        this.projects = await this.service.getAllProjects();
        this.setProject(id);
      } catch (error) {
        showSnackBar('projects not found', this.snackbar);
      }

      try {
        this.articles = await this.service.getAllBlogs();
        this.setBlog(id);
      } catch (error) {
        showSnackBar('articles not found', this.snackbar);
      }

      try {
        this.achievements = await this.service.getAchievements();
        this.setAchievement(id);
      } catch (error) {
        showSnackBar('achievements not found', this.snackbar);
      }

      try {
        this.certificates = await this.service.getCertificates();
        console.log(this.certificates);
        this.setCertificate(id);
      } catch (error) {
        showSnackBar('certificates not found', this.snackbar);
      }
    });
  }

  searchForBlog(id?: string): void {
    if (id) {
      this.setExperience(id);

      this.setProject(id);

      this.setBlog(id);

      this.setAchievement(id);

      this.setCertificate(id);
    } else {
      showSnackBar('Article not found', this.snackbar);
    }
  }

  setCertificate(id: string) {
    this.certificates?.map((certificate) => {
      if (certificate.key === id) {
        this.certificate = certificate;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set('@Blog', 'Blog :: ' + certificate.name);
      }

      const blogMap: Map<string, string> = new Map<string, string>();
      blogMap.set('title', 'Certificate:' + certificate.name);
      blogMap.set('key', certificate.key);

      this.blogList.push(blogMap);
    });
  }

  setAchievement(id: string) {
    this.achievements?.map((achievement) => {
      if (achievement.key === id) {
        this.achievement = achievement;
        this.certificate = undefined;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set('@Blog', 'Blog :: ' + achievement.name);
      }

      const blogMap: Map<string, string> = new Map<string, string>();
      blogMap.set('title', 'Achievement:' + achievement.name);
      blogMap.set('key', achievement.key);

      this.blogList.push(blogMap);
    });
  }

  setBlog(id: string) {
    this.articles?.map((article) => {
      if (article.key === id) {
        this.article = article;
        this.certificate = undefined;
        this.achievement = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set('@Blog', 'Blog :: ' + article.title);
      }

      const blogMap: Map<string, string> = new Map<string, string>();
      blogMap.set('title', 'Article:' + article.title);
      blogMap.set('key', article.key);

      this.blogList.push(blogMap);
    });
  }

  setProject(id: string) {
    this.projects?.map((project) => {
      if (project.key === id) {
        this.project = project;
        this.certificate = undefined;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.breadcrumbService.set(
          '@Blog',
          'Projects :: ' + project.projectName
        );
      }

      const blogMap: Map<string, string> = new Map<string, string>();
      blogMap.set('title', 'Project:' + project.projectName);
      blogMap.set('key', project.key);

      this.blogList.push(blogMap);
    });
  }

  setExperience(id: string): void {
    this.experiences?.map((experience) => {
      if (experience.key === id) {
        this.experience = experience;
        this.certificate = undefined;
        this.achievement = undefined;
        this.project = undefined;
        this.article = undefined;
        this.breadcrumbService.set(
          '@Blog',
          'Experience :: ' + experience.title
        );
      }

      const blogMap: Map<string, string> = new Map<string, string>();
      blogMap.set('title', 'Experience:' + experience.title);
      blogMap.set('key', experience.key);

      this.blogList.push(blogMap);
    });
  }
}
