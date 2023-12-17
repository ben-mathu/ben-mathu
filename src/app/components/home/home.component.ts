import { FirebaseService } from './../../shared/services/firebase.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardDetail } from 'src/app/shared/models/header/card_detail';
import { MyDetails, Skill } from 'src/app/shared/models/header/header';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  myDetails: MyDetails = new MyDetails();
  avatarImage: String = "https://lh3.googleusercontent.com/a/ACg8ocL5ZsD77c6dOJYmEf4p7qNyBDcGY4Ql3p8lBQlKSG7sLB0=s288-c-no";

  cardDetails: CardDetail[] = [
    {
      routeName: './experience',
      cardName: 'Experience',
      icon: 'work_history',
      link: '#'
    },
    {
      routeName: '',
      cardName: 'Projects',
      icon: 'emoji_objects',
      link: '#'
    },
    {
      routeName: '',
      cardName: 'Blog',
      icon: 'rss_feed',
      link: 'https://mathutechblog.wordpress.com/blog/'
    }
  ]

  constructor(private service: FirebaseService) {
  }

  ngOnInit(): void {
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
