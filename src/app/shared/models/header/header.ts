import { DocumentData } from "@angular/fire/firestore";

export class MyDetails implements DocumentData {
  name: string = '';
  headline: string = '';
  description: string= '';
  skills: string = '';
  technologies: string = '';
  skillArr: Skill[] = [];
  techArr: string[] = [];
  cv_url: string = '';
  phone: string = '';
  email: string = '';
}

export class Skill {
  name: string = '';
  rating: string = '';
}
