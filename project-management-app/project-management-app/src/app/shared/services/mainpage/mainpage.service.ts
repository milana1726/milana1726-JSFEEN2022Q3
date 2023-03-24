import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Board, BoardBodyRequest, CreateBoardEvent } from '../../models/interfaces/board-interface';
import { BoardService } from '../board/board.service';
import { RequestBuilderService } from '../request-builder/request-builder.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MainpageService implements OnDestroy {
  private allBoards$ = new BehaviorSubject<Board[]>([]);
  errorMessage = '';
  subscription: Subscription[] = [];
  public searchItem = new BehaviorSubject<string>('');

  constructor(
    private boardService: BoardService,
    private userService: UserService,
    private requestBuilderService: RequestBuilderService) { }

  public getAllBoards$() {
    return this.allBoards$.asObservable();
  }

  getAllBoard() {
    this.boardService.getAllBoards().subscribe({
      next: (data: Board[]) => {
        this.allBoards$.next(data);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    });
  }

  createBoard(event: CreateBoardEvent) {
    const userId = this.userService.getUserId();

    const newBoard: BoardBodyRequest = {
      title: event.value.title,
      owner: userId,
      users: [],
    }

    this.subscription.push(
      this.boardService.createBoard(newBoard).subscribe({
      next: () => {
        this.boardService.getAllBoards().subscribe({
          next: (item: Board[]) => {
            this.allBoards$.next(item);
          },
          error: (error) => {
          },
        });
      },
    }));
  }

  deleteBoard(id: string) {
    this.boardService.deleteBoard(id).subscribe({
      next: () => {
        this.boardService.getAllBoards().subscribe({
          next: (item: Board[]) => {
            this.allBoards$.next(item);
          },
          error: (error) => {
          },
        });
      },
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }

}