import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Product } from '../model/Product';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-product-to-buy',
  standalone: true,
  imports: [CommonModule],
  template: `

    <!-- Contatori -->
    <div class="w-full md:w-2/5 mx-auto my-5">
      <div class="flex justify-between">
        <button class="btn">
          Completati
          <div class="badge">{{ completedProducts() }}</div>
        </button>
        <button class="btn">
          Da Fare
          <div class="badge badge-secondary">{{ toDoProducts() }}</div>
        </button>
      </div>
    </div>
    <!-- Lista prodotti -->
    <div class="w-full md:w-2/5 mx-auto border border-neutral rounded-lg">
      @for (product of products(); track product.id) {
        <label class="cursor-pointer label mr-4">
          <span class="label-text" [ngClass]="{'line-through text-accent': product.completed}">{{product.name}}</span>
            <input type="checkbox" [checked]="product.completed" class="checkbox" (click)="onComplete(product)">
        </label>
      }
      
    </div>
  `,
  styles: ``
})
export class ProductToBuyComponent implements OnInit {
  
  http = inject(HttpClient);
  url = 'http://localhost:3000/products';
  products = signal<Product[]>([]);

  completedProducts = computed(() => this.products().filter(product => product.completed).length);
  toDoProducts = computed(() => this.products().filter(product => !product.completed).length);
  
    ngOnInit(): void {
      this.http.get<Product[]>(this.url)
        .subscribe(res => {
          this.products.set(res.filter(product => product.added))
        });
    }

  onComplete(item: Product) {
    
    let updateProduct = {...item, completed: !item.completed};

    this.http.patch<Product>(`${this.url}/${item.id}`, updateProduct)
     .subscribe(res =>{
      console.log(res);
        this.products.update(prev => {
          return prev.map(product => product.id === item.id ? res : product)
        })
     })

  }
  
}
