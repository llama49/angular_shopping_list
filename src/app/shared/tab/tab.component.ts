import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { BestProductsComponent } from '../../best-products/best-products.component';
import { ProductToBuyComponent } from '../../product-to-buy/product-to-buy.component';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule, HomeComponent, BestProductsComponent, ProductToBuyComponent],
  template: `
  <!-- tabs -->
    <div class="tabs w-full">
      <div class="flex justify-center p-5">
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" (click)="tab=1" [ngClass]="{'btn-neutral': tab===1}">Home</button>
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" (click)="tab=2" [ngClass]="{'btn-neutral': tab===2}">Best Products</button>
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" (click)="tab=3" [ngClass]="{'btn-neutral': tab===3}">Products To Buy</button>
      </div>
      
      <!-- Contenuto -->
      <div>
        @if(tab === 1) {
          <app-home></app-home>
        } @else if (tab === 2) {
          <app-best-products></app-best-products>
        } @else if (tab === 3) {
          <app-product-to-buy>Contenuto 3</app-product-to-buy>
        }
      </div>
    </div>
      `,
  styles: ``
})
export class TabComponent {
  tab: number = 1;
}
