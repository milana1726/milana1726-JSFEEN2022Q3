export interface SignInData {
    login: string | null | undefined;
    password: string | null | undefined;
}

export interface SignInResponse {
    token: string;
}

export interface SignUpData {
    name: string | null | undefined;
    login: string | null | undefined;
    password: string | null | undefined;
}

export interface Token {
    token: string;
}

