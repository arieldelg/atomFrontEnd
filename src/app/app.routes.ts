import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "tasks",
        loadComponent: () => import("./tasks/tasks.component").then((m) => m.TasksComponent)
    },
    {
        path: "home",
        loadComponent: () => import("./auth/login/login.component").then((m) => m.LoginComponent)
    },
];
