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

export interface Task {
    _id: string;
    title: string;
    order: number;
    boardId: string;
    columnId: string;
    description: string;
    userId: string;
    users: string[];
}

export interface CreateTaskEvent {
    clicked: string;
    value: {
      title: string;
      description: string;
    };
}

export interface AllTasks {
    columnId: string;
    tasks: Task[];
}

export interface TaskBodyRequest {
    title: string,
    order: 0,
    description: string,
    userId: string,
    users: string[]
}

export interface CreateTaskRequest {
    _id: string;
    title: string;
    description: string;
    userId: string;
}

export interface UpdateTaskBody {
    title: string;
    order: number;
    boardId: string;
    columnId: string;
    description: string;
    userId: string;
}

export interface UpdateTaskRequest {
    _id: string;
    title: string;
    boardId: string;
    columnId: string;
    description: string;
    userId: string;
}
