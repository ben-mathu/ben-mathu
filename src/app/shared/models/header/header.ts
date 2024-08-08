import { DocumentData } from "@angular/fire/firestore";

export class MyDetails implements DocumentData {
  name: string = '';
  headline: string = '';
  description: string= '';
  languages: Skill[] = [];
  technologies: Skill[] = [];
  techArr: string[] = [];
  cv_url: string = '';
  phone: string = '';
  email: string = '';
  profile_pic: String = '';
}

export class Skill {
  tech: string = '';
  rating: string = '';
  icon: string = '';
}
