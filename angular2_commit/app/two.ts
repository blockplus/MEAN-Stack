import { Component } from 'angular2/core';

@Component({
  selector: 'two-comp',
  templateUrl: 'app/two.html'
})
export class TwoComponent {
  story = { id: 100, name: 'The Force Awakens' };
  color = 'blue';
}