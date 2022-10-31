import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  public incrementBy = 1;

  public incrementCounter() {
    this.currentCount += this.incrementBy;
  }
}

