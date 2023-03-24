import { Component,  OnInit, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Keys } from 'src/app/shared/models/enums/key-enum';
import { Board, CreateBoardEvent } from 'src/app/shared/models/interfaces/board-interface';
import { MainpageService } from 'src/app/shared/services/mainpage/mainpage.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit, OnDestroy {
  boards$: Observable<Board[]> = this.mainpageService.getAllBoards$();
  boards: Board[] = [];
  private subscription: Subscription[] = [];
  public searchText: string;


  constructor(
    private mainpageService: MainpageService,
    private storageSernice: StorageService) {}

  ngOnInit() {
    this.mainpageService.getAllBoard();

    this.subscription.push(
      this.mainpageService.searchItem.subscribe(
        (data) => (this.searchText = data))
    );
  }

  saveBoardId(id: string) {
    this.storageSernice.saveInStorage(Keys.BOARD_ID, id);
  }

  createNewBoard(event: CreateBoardEvent) {
    if (event) {
      this.mainpageService.createBoard(event);
    }
  }

  public deleteBoard(id: string) {
      this.mainpageService.deleteBoard(id);
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }

}
