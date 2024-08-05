import { Component, OnInit } from '@angular/core';
import { CardDetail } from 'src/app/shared/models/header/card_detail';
import { MyDetails, Skill } from 'src/app/shared/models/header/header';
import { AchievementElement, CertificateElement, ExperienceElement, ProjectElement } from 'src/app/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-home.full-width',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  experiences: ExperienceElement[] = [];
  projects: ProjectElement[] = [];
  certificates: CertificateElement[] = [];
  achievements: AchievementElement[] = [];

  yearsOfExperience?: number;

  className: string[] = [' tall', ' wide', ' long', ' big'];
  genClassName: string[] = [];
  genProjectsClassName: string[] = [];
  genCertificateClassName: string[] = [];
  genAchievementClassName: string[] = [];
  numberOfProjects?: number;

  myDetails: MyDetails = new MyDetails();

  cardDetails: CardDetail[] = [
    {
      routeName: ['experience'],
      cardName: 'Experience',
      icon: 'work_history',
      link: '#'
    },
    {
      routeName: [],
      cardName: 'Projects',
      icon: 'emoji_objects',
      link: '#'
    },
    {
      routeName: [],
      cardName: 'Blog',
      icon: 'rss_feed',
      link: 'https://mathutechblog.wordpress.com/blog/'
    }
  ]

  constructor(private service: FirebaseService, private breadcrumbService: BreadcrumbService) {
  }

  getYear(date: string): number {
    const formatter = new Intl.DateTimeFormat('en');
    const options = formatter.formatToParts(new Date(date));
    return Number(options[4].value);
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Home', 'Home');

    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
      this.myDetails.skillArr = result.val().skills.split(',');

      const skillDictList = result.val().skills.split(',');
      const skills: Skill[] = [];

      for (let item of skillDictList) {
        let skillDict = item.split(":");

        const skill: Skill = {
          name: skillDict[0],
          rating: skillDict[1]
        };

        skills.push(skill);
      }

      this.myDetails.skillArr = skills.sort((a: Skill, b: Skill) => {
        const rateA: number = Number(a.rating);
        const rateB: number = Number(b.rating);

        if (rateA < rateB) {
          return 1;
        }

        if (rateA > rateB) {
          return -1;
        }

        return 0;
      });
    });

    this.service.getAllExperiences()
      .then((values) => {
        this.experiences = values

        let startYear = this.getYear(this.experiences[0].startDate);
        let endYear = this.getYear(this.experiences[0].endDate);

        this.genClassName = [];
        this.experiences.map((experience) => {
          const tempStartYear = this.getYear(experience.startDate);
          if (tempStartYear < startYear) {
            startYear = tempStartYear;
          }

          const tempEndYear = this.getYear(experience.endDate);
          if (tempEndYear > endYear) {
            endYear = tempEndYear;
          }

          // shorten the words and add ellipsis
          const classStyleName = this.getClass();
          if (classStyleName === ' wide') {
            experience.description = experience.description.substring(0, 130) + '...';
          } else if (classStyleName === ' long') {
            experience.description = experience.description.substring(0, 150) + '...';
          } else if (classStyleName === ' big') {
            experience.description = experience.description.substring(0, 500) + '...';
          } else if (classStyleName === ' tall') {
            experience.description = experience.description.substring(0, 100) + '...';
          }
          this.genClassName.push(classStyleName);
          // experience.description = experience.description.substring(0, 250) + '...';
        });

        this.yearsOfExperience = endYear - startYear;
      }).catch((err: Error) => {
        // do nothing
      });

    this.service.getAllProjects()
      .then((values) => {
        this.projects = values;
        this.numberOfProjects = this.projects.length;

        this.genProjectsClassName = [];
        this.projects.map((project) => {
          const classStyleName = this.getClass();
          if (classStyleName === ' wide') {
            project.projectDescription = project.projectDescription.substring(0, 130) + '...';
          } else if (classStyleName === ' long') {
            project.projectDescription = project.projectDescription.substring(0, 150) + '...';
          } else if (classStyleName === ' big') {
            project.projectDescription = project.projectDescription.substring(0, 500) + '...';
          } else if (classStyleName === ' tall') {
            project.projectDescription = project.projectDescription.substring(0, 110) + '...';
          }
          this.genProjectsClassName.push(classStyleName);
          // project.projectDescription = project.projectDescription.substring(0, 250) + '...';
        });
      }).catch((err: Error) => {
        // do nothing
      });

    this.service.getCertificates()
      .then((values) => {
        this.certificates = values;

        this.genCertificateClassName = [];
        this.certificates.map((project) => {
          const classStyleName = this.getClass();
          this.genCertificateClassName.push(classStyleName);
        });
      });

    this.service.getAchievements()
      .then((values) => {
        this.achievements = values;

        this.genAchievementClassName = [];
        this.achievements.map((achievement) => {
          const classStyleName = this.getClass();
          if (classStyleName === ' wide') {
            achievement.description = achievement.description.substring(0, 130) + '...';
          } else if (classStyleName === ' long') {
            achievement.description = achievement.description.substring(0, 150) + '...';
          } else if (classStyleName === ' big') {
            achievement.description = achievement.description.substring(0, 500) + '...';
          } else if (classStyleName === ' tall') {
            achievement.description = achievement.description.substring(0, 110) + '...';
          }
          this.genAchievementClassName.push(classStyleName);
        })
      })
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getClass(): string {
    return this.className[this.randomIntFromInterval(0, this.className.length-1)];
  }
}
