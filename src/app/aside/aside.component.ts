import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent{
  @Input()
  isOpened = false;
  @Input() openAside: () => void = Function;
  open = false;
}
