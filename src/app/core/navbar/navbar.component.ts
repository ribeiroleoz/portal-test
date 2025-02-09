import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; // Adicione esta linha
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

}
