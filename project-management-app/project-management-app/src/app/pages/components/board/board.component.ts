import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Keys } from 'src/app/shared/models/enums/key-enum';
import { Column, CreateColumnEvent } from 'src/app/shared/models/interfaces/board-interface';
import { BoardpageService } from 'src/app/shared/services/boardpage/boardpage.service';
import { MainpageService } from 'src/app/shared/services/mainpage/mainpage.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy{

  columns$: Observable<Column[]> = this.boardpageService.getAllColumns$();
  columns: Column[] = [];
  column: Column;

  private subscription: Subscription[] = [];

  searchText: string;

  constructor(
    public boardpageService: BoardpageService,
    public mainpageService: MainpageService,
    private location: Location) {}

  ngOnInit() {
    this.boardpageService.getAllColumn();

    this.subscription.push(
      this.mainpageService.searchItem.subscribe(
        (data) => (this.searchText = data))
    );
  }

  onReturn() {
    this.location.back();
  }

  createNewColumn(event: CreateColumnEvent) {
    if (event) {
      this.boardpageService.createColumn(event);
    }
  }

  setOneField() {
    document.getElementById("textarea-desc").hidden = true;
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }

}
