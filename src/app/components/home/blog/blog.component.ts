import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExperienceElement, ProjectElement } from 'src/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-blog.full-width',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  
  experience?: ExperienceElement;
  project?: ProjectElement;

  experiences?: ExperienceElement[];
  projects?: ProjectElement[];
  blogList: Map<string, string>[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private service: FirebaseService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.breadcrumbService.set('@Blog', 'Blog');
    this.activatedRoute.params.subscribe(async params => {
      let id = params['id'];
    
      await this.service.getAllExperiences()
        .then((values) => {
          this.experiences = values;

          this.experiences?.map((experience) => {
            if (experience.key === id) {
              this.experience = experience;
              this.breadcrumbService.set('@Blog', 'Blog :: ' + experience.title);
            }
            
            const blogMap: Map<string, string> = new Map<string, string>()
            blogMap.set('title', experience.title);

            this.blogList.push(blogMap);
          });
        }).catch((err: Error) => {
          // do nothing
        });

      await this.service.getAllProjects()
        .then((values) => {
          this.projects = values;

          this.projects?.map((project) => {
            if (project.key === id) {
              this.project = project;
              this.breadcrumbService.set('@Blog', 'Blog -> ' + project.projectName);
            }

            const blogMap: Map<string, string> = new Map<string, string>()
            blogMap.set('title', project.projectName);

            this.blogList.push(blogMap);
          });
        }).catch((err: Error) => {
          // do nothing
        });
    });
  }
}
