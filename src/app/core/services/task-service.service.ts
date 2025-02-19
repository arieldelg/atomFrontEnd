import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    catchError, map, Observable, of
} from "rxjs";

import { environments } from "../../environments/environment";
import {
    AddTask, GetAllUserTask, NewTask, Response, Task,
    UpdatedTask
} from "../types/task.types";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class TaskService {
    public headers: HttpHeaders = new HttpHeaders();

    constructor(
        private readonly http: HttpClient,
        private readonly localStorageService: LocalStorageService
    ) {
    }

    public getUserTasks(uid: string): Observable<Task[]> {
        return this.http.get<GetAllUserTask>(`${environments.baseUrlBackend}/tasks`, {
            headers: this.headers.set("uid", uid)
        })
            .pipe(
                map((x) => x.data),
                catchError((err) => of(err))
            );
    }

    public addTask(body: NewTask): Observable<Task> {
        return this.http.post<AddTask>(
            `${environments.baseUrlBackend}/tasks`,
            body,
            { headers: this.headers.set("uid", this.localStorageService.getUserLocalStorage()) }
        )
            .pipe(
                map((x) => x.data),
                catchError((err) => of(err))
            );
    }

    public updatedTask(idTask: string, body: UpdatedTask): Observable<Response> {
        return this.http.put<Response>(`${environments.baseUrlBackend}/tasks/${idTask}`, body, {
            headers: this.headers.set("uid", this.localStorageService.getUserLocalStorage())
        })
            .pipe(
                catchError((err) => of(err))
            );
    }

    public deleteTask(idTask: string): Observable<Response> {
        return this.http.delete<Response>(`${environments.baseUrlBackend}/tasks/${idTask}`, {
            headers: this.headers.set("uid", this.localStorageService.getUserLocalStorage())
        })
            .pipe(
                catchError((err) => of(err))
            );
    }
}
