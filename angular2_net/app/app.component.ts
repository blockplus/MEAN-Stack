import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { ComponentOne } from 'app/cone';
import { ComponentTwo } from 'app/ctwo';
import { ComponentThree } from 'app/cthree';

@Component({
  selector: 'app-begin',
  templateUrl: 'app/typography.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path:'/component-one', name: 'ComponentOne', component: ComponentOne},
  {path:'/component-two', name: 'ComponentTwo', component: ComponentTwo},
  {path:'/component-three', name: 'ComponentThree', component: ComponentThree}
])
export class AppComponent {
}