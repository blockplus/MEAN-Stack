import { Component } from 'angular2/core';

@Component({
  selector: 'one-comp',
  templateUrl: 'app/one.html'
})
export class OneComponent {
  story = { id: 100, name: 'The Force Awakens' };
  color = 'blue';
}