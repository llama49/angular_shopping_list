import { Component } from '@angular/core';

@Component({
  selector: 'app-product-to-buy',
  standalone: true,
  imports: [],
  template: `
    <!-- Lista prodotti -->
    <div class="w-full md:w-2/5 mx-auto border border-neutral rounded-lg">
      <label class="cursor-pointer label mr-4">
        <span class="label-text">Prodotto 1</span>
          <input type="checkbox" checked="checked" class="checkbox">
      </label>
    </div>
  `,
  styles: ``
})
export class ProductToBuyComponent {

}
