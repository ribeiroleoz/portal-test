import { Routes } from "@angular/router";
import { ProductFormComponent } from "./create/product-form.component";
import { ProductViewComponent } from "./view/product-view.component";
import { UpdateProductFormComponent } from "./update/update-product.component";

export const ProductRoutes: Routes = [
    {
        path: 'new-product',
        component: ProductFormComponent
    },
    {
        path: 'view-product/:id',
        component: ProductViewComponent
    },
    {
        path: 'update-product/:id',
        component: UpdateProductFormComponent
    }
]