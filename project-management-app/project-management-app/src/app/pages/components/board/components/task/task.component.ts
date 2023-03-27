import { Component, Input } from '@angular/core';
import { Keys } from 'src/app/shared/models/enums/key-enum';
import { Task } from 'src/app/shared/models/interfaces/board-interface';
import { BoardpageService } from 'src/app/shared/services/boardpage/boardpage.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

constructor(
  private boardpageService: BoardpageService,
  private storageService: StorageService) {}

  @Input() task!: Task;

  setTwoFields() {
    document.getElementById("textarea-desc").hidden = false;
  }

  setDeleteTask() {
    document.getElementById("delete-board").hidden = true;
    document.getElementById("delete-profile").hidden = true;
    document.getElementById("delete-column").hidden = true;
    document.getElementById("delete-task").hidden = false;
  }

  deleteTask(eventConfirm: any, taskId: string) {
    const boardId = this.storageService.getFromStorage(Keys.BOARD_ID);
    const columndId = this.storageService.getFromStorage(Keys.COLUMN_ID);
    if (eventConfirm) {
      this.boardpageService.deleteTask(boardId, columndId, taskId);
    }
  }
}
