import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpManagerInterceptor} from "./interceptor/http-manager.interceptor";

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideRouter(routes),
      provideClientHydration(),
      provideHttpClient(withInterceptors([httpManagerInterceptor])),
      provideAnimationsAsync()
    ]
};
