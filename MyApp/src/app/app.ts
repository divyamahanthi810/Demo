import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './Component/toolbar/toolbar';
import { Component3 } from './Component/component3/component3';

@Component({
  selector: 'app-root',
  imports: [Toolbar,RouterOutlet,Component3],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyApp');
}
