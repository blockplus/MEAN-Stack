import { Component } from 'angular2/core';

@Component({
  templateUrl: 'app/one.html'
})

export class ComponentOne {
  story = { id: 100, name: 'The Force Awakens' };
  color = 'blue';
}