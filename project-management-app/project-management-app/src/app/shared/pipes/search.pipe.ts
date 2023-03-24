import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../models/interfaces/board-interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(boards: Board[], searchText: string) {
    if (boards) {
      if (boards.length === 0 || searchText === '') {
        return boards;
      } else {
        return boards.filter((board) =>
          board.title.toLowerCase().includes(searchText.toLowerCase()));
      }
    }
    return boards;
  }
}
