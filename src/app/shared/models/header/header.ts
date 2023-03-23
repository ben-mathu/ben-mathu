import { DocumentData } from "@angular/fire/firestore";

export class MyDetails implements DocumentData {
  name!: string;
  headline!: string;
  description!: string;
  skills!: string;
  technologies!: string;
  skillArr!: string[];
  techArr!: string[];
  cv_url!: string;
}
