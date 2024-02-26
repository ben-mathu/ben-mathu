import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { CardDetail } from 'src/app/shared/models/header/card_detail';
import { MyDetails, Skill } from 'src/app/shared/models/header/header';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-home.full-width',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  myDetails: MyDetails = new MyDetails();
  avatarImage: String = "https://lh3.googleusercontent.com/a/ACg8ocL5ZsD77c6dOJYmEf4p7qNyBDcGY4Ql3p8lBQlKSG7sLB0=s288-c-no";

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
  }
}
