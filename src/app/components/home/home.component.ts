import { FirebaseService } from './../../shared/services/firebase.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyDetails, Skill } from 'src/app/shared/models/header/header';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myDetails: MyDetails = new MyDetails();
  avatarImage: String = "https://lh3.googleusercontent.com/a/ACg8ocL5ZsD77c6dOJYmEf4p7qNyBDcGY4Ql3p8lBQlKSG7sLB0=s288-c-no";

  constructor(private service: FirebaseService) {
  }

  ngOnInit(): void {
    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
      this.myDetails.skillArr = result.val().skills.split(',');

      const skillDictList = result.val().skills.split(',');
      const skills: Skill[] = [];
      console.log(skillDictList);

      for (let item in skillDictList) {
        let skillDict = item.split(":");

        const skill: Skill = {
          name: skillDict[0],
          rating: skillDict[1]
        }
      }

      this.myDetails.skillArr = skills;
    });
  }
}
