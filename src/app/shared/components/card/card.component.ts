import { Component, Input } from '@angular/core';
import { CardDetail } from '../../models/header/card_detail';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardDetail!: CardDetail;
}
