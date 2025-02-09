import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../services/api';
import { IProduct } from '../product/product';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpParams } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [ApiService],
  imports: [MatMenuModule, NgxSkeletonLoaderModule, MatPaginatorModule, MatCardModule, CommonModule, MatInputModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) { }
  private searchSubject = new Subject<string>();
  loading: boolean = true;
  products: IProduct[] = [];
  searchTerm = '';
  pagination = {
    options: [
      5, 10, 25, 50, 100
    ],
    size: 10,
    total: 100,
    page: 0,
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),

      switchMap(() => {
        this.loading = true;
        let filters = new HttpParams();
        filters = filters.set('page', this.pagination.page);
        filters = filters.set('limit', this.pagination.size);
        if (this.searchTerm) {
          filters = filters.set('search', this.searchTerm);
        }
        return this.api.get('products', filters);
      })
    ).subscribe((data: any) => {
      this.pagination.total = data.pagination.total;
      this.products = data.data;
      this.loading = false;
    });

    this.searchSubject.next(this.searchTerm);
  }

  onPaginate(pagination: any) {
    this.pagination.page = pagination.pageIndex;
    this.pagination.size = pagination.pageSize;
    this.searchSubject.next(this.searchTerm);
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  updateProduct(id: string) {
    this.router.navigate([`/update-product/${id}`])
  }

  disableProduct(id: string) {
    this.api.delete('products', id);
  }

  navigateToProduct(id: string) {
    this.router.navigate([`/view-product/${id}`])
  }
}
