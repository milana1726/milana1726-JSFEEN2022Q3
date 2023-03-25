
export interface UserData {
    _id: string;
    name: string;
    login: string;
}

export interface UserBodyRequest {
    name: string;
    login: string;
    password: string;
}