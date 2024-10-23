import { Component } from '@angular/core';
import { MainpageService } from 'src/app/shared/services/mainpage/mainpage.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  public searchText = '';

  constructor(private mainpageService: MainpageService) {}

  searchInput() {
    this.mainpageService.searchItem.next(this.searchText);
  }
}
