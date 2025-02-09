import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ProductRoutes } from './core/product/routes';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    ...ProductRoutes,
];


@NgModule({
    imports: [RouterModule.forRoot(routes), BrowserAnimationsModule, ToastrModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }