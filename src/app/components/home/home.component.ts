import { gsap } from 'gsap';
import { FirebaseService } from './../../shared/services/firebase.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyDetails } from 'src/app/shared/models/header/header';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('menu') element: ElementRef | undefined;

  myDetails: MyDetails = new MyDetails();
  timeline: gsap.core.Timeline;

  constructor(private service: FirebaseService) {
    this.timeline = gsap.timeline()
      .fromTo(this.element!, {
        opacity: 0,
        translateY: -30
      },
      {
        duration: 1,
        opacity: 1,
        translateY: 0,
        stagger: 0.2
      }
      )
  }

  ngOnInit(): void {
    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
      this.myDetails.skillArr = result.val().skills.split(',');
      this.myDetails.techArr = result.val().technologies.split(',');
    });
  }
}
