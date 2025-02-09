import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../services/api';
import { IProductForm } from '../product';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  providers: [ApiService],
  imports: [MatIconModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatCardModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  constructor(private toastr: ToastrService, private api: ApiService, private router: Router) { }
  selectedFile: File | null = null;

  productForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    stock: new FormControl(0, { nonNullable: true }),
    price: new FormControl(0, { nonNullable: true }),
    image: new FormControl()
  })

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.productForm.patchValue({
      image: this.selectedFile,
    });
  }

  navigateBack() {
    this.router.navigate(['/'])
  }

  onSubmit() {
    const payload: IProductForm = this.productForm.getRawValue();
    const formData = new FormData();

    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('stock', payload.stock.toString());
    formData.append('price', payload.price.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name)
    }

    this.api.put('products', formData).subscribe({
      next: (data: any) => {
        this.navigateBack();
      },
      error: () => this.toastr.error('Houve algum erro ao cadastrar produto', 'Erro')
    });
  }
}
