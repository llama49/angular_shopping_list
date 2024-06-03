import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h1 class="text-3xl font-bold underline">
  Hello world!
</h1>

<button class="btn btn-secondary">Secondary</button>
  `,
  styles: [],
})

export class AppComponent {
  title = 'shopping-list';
}
