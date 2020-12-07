import { Component, Input } from '@angular/core';

export interface Wine  {
  name: string;
  img: string;
  price: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent {
  @Input()
  wine: Wine = {name: ``, img: ``, price: 0};
}
