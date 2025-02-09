import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'portal-test';
}
