import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Product } from '../model/Product';

@Component({
  selector: 'app-best-products',
  standalone: true,
  imports: [],
  template: `
    <!-- Sezione nuovo prodotto -->
    <div class="w-full md:w-2/5 mx-auto my-4">
      <label class="input input-bordered flex items-center gap-2">
        <input type="text" (keydown.enter)="onAddProduct($event)" class="grow" placeholder="Aggiungi" />
        <kbd class="kbd kbd-sm">Enter</kbd>
      </label>
    </div>

    <!-- Lista prodotti -->
    <div class="w-full md:w-2/5 mx-auto border border-neutral rounded-lg">

      @for (product of products(); track product.id) {
        <div class="flex justify-between">
          <div class="flex items-center">
            <button class="btn-square btn-ghost" (click)="onDelete(product)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-error">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
            <span class="label-text">{{product.name}}</span>
          </div>
        <!-- Checkbox -->
        <label class="cursor-pointer label mr-4">
          <input type="checkbox" [checked]="product.added" class="checkbox" (click)="onProductToBuy(product)">
        </label>
        </div>
      }

    </div>
  `,
  styles: ``
})
export class BestProductsComponent implements OnInit {
  http = inject(HttpClient);
  url = 'http://localhost:3000/products';
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.http.get<Product[]>(this.url)
      .subscribe(res => {
        this.products.set(res)
      })
  }

  onAddProduct(event: any) {

    let nameProduct = event.target.value;

    let newProduct: Product = {
      name: nameProduct,
      added: false,
      completed: false
    }

    this.http.post<Product>(this.url, newProduct)
      .subscribe(res =>{
        this.products.update( prev => [...prev, res]);
      })

    event.target.value = ''
  }

  onProductToBuy(item: Product) {

    let updateProduct = {...item, added: !item.added};

    this.http.patch<Product>(`${this.url}/${item.id}`, updateProduct)
     .subscribe(res =>{
      console.log(res);
        this.products.update(prev => {
          return prev.map(product => product.id === item.id ? res : product)
        })
     })

  }

  onDelete(item:Product) {

    this.http.delete<Product>(`${this.url}/${item.id}`)
      .subscribe(res =>{
        this.products.update( prev => prev.filter(product => product.id !== res.id));
      })
  }

}
