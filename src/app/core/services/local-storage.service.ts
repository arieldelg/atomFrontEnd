/* eslint-disable class-methods-use-this */
import { Injectable } from "@angular/core";

import { User } from "../types/auth.types";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {
    public uid!: string;

    constructor() {
        this.getUserLocalStorage();
    }
    public getUserLocalStorage() {
        const string = localStorage.getItem("credentials");
        if (string) {
            const { uid } = JSON.parse(string) as User;
            return uid;
        }
        return "";
    }
}
