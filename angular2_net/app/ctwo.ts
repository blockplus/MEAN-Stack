import { Component } from 'angular2/core';

@Component({
  templateUrl: 'app/two.html'
})

export class ComponentTwo {
  story = { id: 100, name: 'The Force Awakens' };
  color = 'blue';
}