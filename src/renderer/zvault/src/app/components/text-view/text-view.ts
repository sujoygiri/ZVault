import { CommonModule } from '@angular/common';
import { Component, input, model, output, QueryList, ViewChildren } from '@angular/core';
import { ItemCardStyleDirective } from '../../directives/item-card-style.directive';
import { ToggleStateDirective } from '../../directives/toggle-state.directive';
import { TimeAgoPipe } from '../../utils/time-ago.pipe';
import { Header } from '../header/header';
import { DataType, TextDetails } from '@zvault/shared-api';
import { GlobalService } from '../../services/global.service';
import { ToolTip } from '../tool-tip/tool-tip';

@Component({
  selector: 'app-text-view',
  imports: [
    CommonModule,
    Header,
    ToolTip,
    ItemCardStyleDirective,
    ToggleStateDirective,
    TimeAgoPipe
  ],
  templateUrl: './text-view.html',
  styleUrl: './text-view.css',
})
export class TextView {

  @ViewChildren(ToggleStateDirective) toggleStateDirective!: QueryList<ToggleStateDirective>;

  vaultItemTexts = model<TextDetails[]>([]);
  isDarkMode = input<boolean>(false);

  addText = output<void>();
  sortChange = output<string>();
  openContentViewModal = output<{ title: string; content: string; }>();
  editText = output<{ item: TextDetails; type: DataType; }>();
  deleteText = output<{ id: string; title: string; type: DataType; }>();

  constructor (private globalService: GlobalService) { }

  async handleTextEdit(item: TextDetails, toggleState: ToggleStateDirective) {
    await this.fetchDecryptedData(item.id, toggleState);
    const totalTextData: TextDetails = {
      ...item,
      content: toggleState.attachedData().content,
    };
    this.editText.emit({item: totalTextData, type: 'text'});
    toggleState.reset();
  }

  async triggerContentViewInModal(id: string, title: string, toggleState: ToggleStateDirective) {
    await this.fetchDecryptedData(id, toggleState);
    const content = toggleState.attachedData().content;
    this.openContentViewModal.emit({ title, content });
  }

  async fetchDecryptedData(id: string, toggleState: ToggleStateDirective) {
    if (id && toggleState && toggleState.attachedData() === null) {
      const rawResponse = await window.electronAPI?.decryptSensitiveData(id, this.globalService.selectedDataType());
      if (rawResponse) {
        const parsedResponse = JSON.parse(rawResponse);
        toggleState.attachedData.set(parsedResponse);
      }
    }
  }

  async copyContent(id: string, toggleState: ToggleStateDirective) {
    await this.fetchDecryptedData(id, toggleState);
    navigator.clipboard.writeText(toggleState.attachedData().content);
  }
}
