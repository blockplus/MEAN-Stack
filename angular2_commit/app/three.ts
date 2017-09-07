import { Component } from 'angular2/core';

@Component({
  selector: 'three-comp',
  templateUrl: 'app/three.html'
})
export class ThreeComponent {
  story = { id: 100, name: 'The Force Awakens' };
  color = 'blue';
}