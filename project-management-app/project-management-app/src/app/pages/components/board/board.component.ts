import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { CreateColumnEvent } from 'src/app/shared/models/interfaces/board-interface';
import { BoardpageService } from 'src/app/shared/services/boardpage/boardpage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(
    private boardpageService: BoardpageService,
    private location: Location) {}

g
  onReturn() {
    this.location.back();
  }

  createNewColumn(event: CreateColumnEvent) {
    if (event) {
      console.log(event.value.title)
      this.boardpageService.createColumn(event);
    }
  }

  setOneField() {
    document.getElementById("textarea-desc").hidden = true;
  }
}
