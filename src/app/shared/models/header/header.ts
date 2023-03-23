import { DocumentData } from "@angular/fire/firestore";

export class Header implements DocumentData {
  name!: string;
  headline!: string;
  description!: string;
  skills!: string;
  technologies!: string;
  skillArr!: string[];
  techArr!: string[];
}
