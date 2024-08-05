import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  AchievementElement,
  BlogElement,
  CertificateElement,
  ExperienceElement,
  ProjectElement,
} from 'src/app/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Constants } from 'src/app/shared/utils/constants';
import { Utils } from 'src/app/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

interface Article {
  key: string | undefined;
  title: string | undefined;
  type: string | undefined;
}

@Component({
  selector: 'app-blog.full-width',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  providers: [
    {
      provide: Utils
    }
  ],
  animations: [
    trigger('slideInOut', [
      state('left', style({ transform: 'translateX(-100%)'})),
      state('center', style({ transform: 'translateX(0)'})),
      state('right', style({ transform: 'translateX(100%)'})),
      transition('* => *', animate('800ms ease-in-out'))
      // transition(':enter', [
      //   style({ tranform: 'translateX({{ direction }}%)' }),
      //   animate('400ms ease-in', style({ transform: 'translateX(0%)' }))
      // ])
      // state('void', style({ transform: 'translateX(100%)' })),
      // transition(':enter', [
      //   style({ transform: 'translateX(-100%)' }),
      //   animate('0.5s ease-in-out', style({ transform: 'translateX(0)'}))
      // ]),
      // transition(':leave', [
      //   animate('.5s ease-in-out', style({ transform: 'translateX(100%)' }))
      // ])
    ])
  ]
})
export class BlogComponent implements OnInit {
  // Constants
  static readonly ARTICLE = '@Article'

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

  articleMap: Map<string, Map<string, Map<string, string>>> = new Map();
  articleCarousel: Article[] = [];
  carouselDeque: Article[] = [];
  indexDeque: number[] = [];

  utils: Utils;

  currentIndex = 0;
  prevIndex = 0;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private service: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    utils: Utils
  ) {
    this.utils = utils;
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Article', 'Article');
    this.activatedRoute.params.subscribe(async (params) => {
      let id = params['id'];
      this.articleCarousel = [];

      try {
        this.experiences = await this.service.getAllExperiences();
        this.setExperience(id);
      } catch (error) {
        // catch error
      }

      try {
        this.projects = await this.service.getAllProjects();
        this.setProject(id);
      } catch (error) {
        // catch error
      }

      try {
        this.articles = await this.service.getAllBlogs();
        this.setBlog(id);
      } catch (error) {
        // catch error
      }

      try {
        this.achievements = await this.service.getAchievements();
        this.setAchievement(id);
      } catch (error) {
        // catch error
      }

      try {
        this.certificates = await this.service.getCertificates();
        this.setCertificate(id);
      } catch (error) {
        // catch error
      }
    });
  }

  /**
   * Maps articles in categories
   *
   * 1 Article Category
   *    1.1 Article ID
   *        1.1.1 Title & Type
   *
   * @param title - Title of the article
   * @param type - Type of the article
   * @param certificateId - Key Provided by firebase
   * @param key - corresponds to the article type, a key for list of article
   */
  addToMap(title: string, type: string, articleId: string, key: string) {
    if (key === Constants.PROJECT || key === Constants.ARTICLE) {
      let articles = this.articleMap.get(key);

      let articleById!: Map<string, string> | undefined;

      if (!articles) {
        articles = new Map<string, Map<string, string>>();
        articleById = new Map<string, string>();
      } else {
        articleById = articles.get(articleId)

        if (!articleById) {
          articleById = new Map<string, string>();
        }
      }

      articleById.set('title', title);

      articles.set(articleId, articleById);

      this.articleMap.set(key, articles);
    }

    const a: Article = {
      key: articleId,
      title: title,
      type: type
    }
    this.articleCarousel.push(a);

    if (this.carouselDeque.length <= 2) {
      this.carouselDeque.push(a);
    }
  }

  setCertificate(id: string) {
    this.certificates?.map((certificate) => {
      const articleType = this.utils.capitalize(Constants.CERTIFICATE);
      if (certificate.key === id) {
        this.certificate = certificate;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, certificate.name)
        );
      }

      this.addToMap(
        certificate.name,
        articleType,
        certificate.key,
        Constants.CERTIFICATE
      );
    });
  }

  setAchievement(id: string) {
    this.achievements?.map((achievement) => {
      const articleType = this.utils.capitalize(Constants.ACHIEVEMENT);
      if (achievement.key === id) {
        this.achievement = achievement;
        this.certificate = undefined;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, achievement.name)
        );
      }

      this.addToMap(
        achievement.name,
        articleType,
        achievement.key,
        Constants.ACHIEVEMENT
      );
    });
  }

  setBlog(id: string) {
    this.articles?.map((article) => {
      const articleType = this.utils.capitalize(Constants.ARTICLE);
      if (article.key === id) {
        this.article = article;
        this.certificate = undefined;
        this.achievement = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, article.title)
        );
      }

      this.addToMap(
        article.title,
        articleType,
        article.key,
        Constants.ARTICLE
      );
    });
  }

  getBreadcrumb(articleType: string, articleTitle: string): string {
    return articleType + ' :: ' + articleTitle;
  }

  setProject(id: string) {
    this.projects?.map((project) => {
      const articleType = this.utils.capitalize(Constants.PROJECT);
      if (project.key === id) {
        this.project = project;
        this.certificate = undefined;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, project.projectName)
        );
      }

      this.addToMap(
        project.projectName,
        articleType,
        project.key,
        Constants.PROJECT
      );
    });
  }

  setExperience(id: string): void {
    this.experiences?.map((experience) => {
      const articleType = this.utils.capitalize(Constants.EXPERIENCE)
      if (experience.key === id) {
        this.experience = experience;
        this.certificate = undefined;
        this.achievement = undefined;
        this.project = undefined;
        this.article = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, experience.title)
        );
      }

      this.addToMap(
        experience.title,
        articleType,
        experience.key,
        Constants.EXPERIENCE
      );
    });
  }

  getSlideAnimation(index: number) {
    if (index === this.currentIndex - 1) {
      return 'left';
    } else if (index === this.currentIndex) {
      return 'center';
    } else if (index === (this.currentIndex + 1) % this.carouselDeque.length) {
      return 'right';
    } else {
      return 'left';
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselDeque.length;
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselDeque.length) % this.carouselDeque.length;
  }
}
