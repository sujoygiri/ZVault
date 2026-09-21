import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { MenuItem } from '../../services/global.service';



@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  currentMenuItem = signal<MenuItem>('passwords');
  onSelectMenuItem = output<MenuItem>();
  handleMenuItemSelect(menuItem: MenuItem) {
    this.currentMenuItem.set(menuItem);
    this.onSelectMenuItem.emit(menuItem);
  }
}
