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

export interface Column {
    _id: string;
    title: string;
    order: number;
}

export interface CreateColumnEvent {
    clicked: string;
    value: {
      title: string;
    };
}

export interface ColumnBodyRequest {
    title: string;
    order: number;
}

