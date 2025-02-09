import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ProductRoutes } from './core/product/routes';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    ...ProductRoutes,
];


@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }