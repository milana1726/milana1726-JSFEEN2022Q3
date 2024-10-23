import { TestBed } from '@angular/core/testing';

import { BoardpageService } from './boardpage.service';

describe('BoardpageService', () => {
  let service: BoardpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
