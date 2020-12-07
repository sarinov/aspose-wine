import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() keyUp: (e: any) => void = Function;
  @Input() handleSearch: (e: any) => void = Function;
}
