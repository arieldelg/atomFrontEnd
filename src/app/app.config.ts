import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { environments } from "../environments/environment";
import { routes } from "./app.routes";

const firebaseConfig = {
    apiKey: environments.apiKey,
    authDomain: environments.authDomain,
    projectId: environments.projectId,
    storageBucket: environments.storageBucket,
    messagingSenderId: environments.messagingSenderId,
    appId: environments.appId,
    measurementId: environments.measurementId
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())]
};
