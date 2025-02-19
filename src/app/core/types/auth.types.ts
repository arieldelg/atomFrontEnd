export interface FormLogin {
    email: string,
    displayName: string,
    password: string
}

export interface User {
    email: string,
    role: string,
    emailValidated: boolean,
    createdAt: Date,
    uid: string
    displayName: string
}

export interface ErrorResponse {
    ok: boolean,
    message: string
}
