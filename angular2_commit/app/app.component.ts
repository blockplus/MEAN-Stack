import {Component } from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FirstComponent} from './first.component';
import {SecondComponent} from './second.component';
import {ThirdComponent} from './third.component';


@Component({
  selector: 'app-begin',
  templateUrl: 'app/main.html',  
  directives: [ROUTER_DIRECTIVES]  
})
@RouteConfig([
  {path: '/first',   name: 'First', component: FirstComponent},  
  {path: '/second', name: 'Second', component: SecondComponent},
  {path: '/third', name: 'Third', component: ThirdComponent}
])
export class AppComponent {
  story = { id: 100, name: 'The Force Awakens' };
  color = 'blue';
}