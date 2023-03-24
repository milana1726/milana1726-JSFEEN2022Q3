export interface Board {
    _id: string;
    title: string;
}

export interface CreateBoardEvent {
    clicked: string;
    value: {
      title: string;
      description: string;
      userId?: string;
    };
}

export interface CreateBoardRequest {
    title: string;
}

export interface BoardBodyRequest {
    title: string;
    owner: string;
    users: string[];
}