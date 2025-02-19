import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";

import { environments } from "../../environments/environment";
import { ErrorResponse, FormLogin, User } from "../types/auth.types";

@Injectable({
    providedIn: "root",
})
export class AuthServiceService {
    constructor(private readonly http: HttpClient) {}

    register(body: FormLogin): Observable<User | ErrorResponse> {
        return this.http
            .post<User>(`${environments.baseUrlBackend}/user`, body)
            .pipe(catchError((err) => of(err)));
    }

    login(email: string): Observable<User | ErrorResponse> {
        return this.http
            .get<User | ErrorResponse>(`${environments.baseUrlBackend}/user/${email}`)
            .pipe(catchError((err) => of(err)));
    }
}
