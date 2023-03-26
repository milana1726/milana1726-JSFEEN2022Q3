import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Keys } from 'src/app/shared/models/enums/key-enum';
import { Column } from 'src/app/shared/models/interfaces/board-interface';
import { BoardpageService } from 'src/app/shared/services/boardpage/boardpage.service';
import { MainpageService } from 'src/app/shared/services/mainpage/mainpage.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  columns$: Observable<Column[]> = this.boardpageService.getAllColumns$();
  column: Column[] = [];
  private subscription: Subscription[] = [];
  searchText: string;
  isEditEnable: boolean;
  titleColumn = '';

  constructor(
    private boardpageService: BoardpageService,
    private mainpageService: MainpageService,
    private storageService: StorageService) {}

  ngOnInit() {
    this.boardpageService.getAllColumn();

    this.subscription.push(
      this.mainpageService.searchItem.subscribe(
        (data) => (this.searchText = data))
    );
  }

  saveColumndId(id: string) {
    this.storageService.saveInStorage(Keys.COLUMN_ID, id);
  }

  setTwoFields() {
    document.getElementById("textarea-desc").hidden = false;
  }

  deleteColumn(eventConfirm: any, id: string) {
    if (eventConfirm) {
      this.boardpageService.deleteColumn(id);
    }
  }

  onExit() {

  }

  onEdit(){
    this.isEditEnable =!this.isEditEnable;
}

  setDeleteColumn() {
    document.getElementById("delete-board").hidden = true;
    document.getElementById("delete-profile").hidden = true;
    document.getElementById("delete-column").hidden = false;
    document.getElementById("delete-task").hidden = true;
  }

}
