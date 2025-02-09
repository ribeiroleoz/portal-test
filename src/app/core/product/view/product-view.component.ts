import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product';
import { ApiService } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-view',
  standalone: true,
  providers: [ApiService],
  imports: [NgxSkeletonLoaderModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './product-view.component.html',
})

export class ProductViewComponent implements OnInit {
  id!: string;
  productData!: IProduct;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private api: ApiService) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    this.api.getOne<IProduct>('products', this.id).subscribe({
      next: (data: any) => {
        this.productData = data;
      },
      error: (err) => this.toastr.error('Houve algum erro ao buscar dados do produto', 'Erro')
    });
  }

  navigateBack() {
    this.router.navigate(['/'])
  }
}
