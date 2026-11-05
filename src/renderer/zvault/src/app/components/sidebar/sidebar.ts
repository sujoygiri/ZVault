import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { MenuItem } from '../../services/global.service';
import { ToolTip } from '../tool-tip/tool-tip';
import { UpdateService } from '../../services/update.service';



@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    ToolTip
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  currentMenuItem = signal<MenuItem>('passwords');
  onSelectMenuItem = output<MenuItem>();
  constructor(protected updateService: UpdateService) {}
  handleMenuItemSelect(menuItem: MenuItem) {
    this.currentMenuItem.set(menuItem);
    this.onSelectMenuItem.emit(menuItem);
  }
}
