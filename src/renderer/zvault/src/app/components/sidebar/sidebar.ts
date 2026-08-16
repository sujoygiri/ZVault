import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  selectedMenuItem = input<'passwords' | 'settings'>('passwords');
  selectMenuItem = output<'passwords' | 'settings'>();
  
}
