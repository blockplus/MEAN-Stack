import {bind} from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS,bind(APP_BASE_HREF).toValue(location.pathname)]);