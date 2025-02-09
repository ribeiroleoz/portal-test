import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../services/api';
import { IProduct, IProductForm } from '../product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product-form',
  standalone: true,
  providers: [ApiService],
  imports: [MatIconModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatCardModule],
  templateUrl: './update-product.component.html',
})
export class UpdateProductFormComponent implements OnInit {
  id!: string;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  productForm = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    stock: new FormControl(0, { nonNullable: true }),
    price: new FormControl(0, { nonNullable: true }),
    image: new FormControl()
  })

  ngOnInit(): void {
    this.fetchData();
  }

  navigateBack() {
    this.router.navigate(['/'])
  }

  async fetchData() {
    this.api.getOne<IProduct>('products', this.id).subscribe({
      next: (data: any) => {
        this.productForm.setValue({
          id: data.id,
          name: data.name,
          description: data.description,
          stock: data.stock,
          price: data.price,
          image: data.image || ''
        });
      },
      error: (err) => console.log('Erro: ', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.productForm.patchValue({
      image: this.selectedFile,
    });
  }

  onSubmit() {
    const payload: IProductForm = this.productForm.getRawValue();
    const formData = new FormData();

    formData.append('id', this.id);
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('stock', payload.stock.toString());
    formData.append('price', payload.price.toString());
    formData.append('image', this.selectedFile!, this.selectedFile!.name)

    this.api.put('products', formData).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => console.log('Erro: ', err)
    });
  }
}
