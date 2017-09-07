import { Component } from 'angular2/core';

@Component({
  templateUrl: 'app/three.html'
})

export class ComponentThree {
  story = { id: 100, name: 'The Force Awakens' };
  color = 'blue';
}