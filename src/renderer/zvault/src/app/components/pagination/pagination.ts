import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  // Inputs
  totalEntries = input.required<number>();
  currentPage = input<number>(1);
  pageSize = input<number>(12);
  pageSizeOptions = input<number[]>([12, 24, 36, 48, 60]);

  // Outputs
  pageChange = output<number>();
  pageSizeChange = output<number>();

  // Computed properties
  totalPages = computed(() => Math.ceil(this.totalEntries() / this.pageSize()) || 1);

  startEntry = computed(() => {
    if (this.totalEntries() === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  endEntry = computed(() => {
    return Math.min(this.currentPage() * this.pageSize(), this.totalEntries());
  });

  // Dynamic pagination range with ellipsis (...) logic
  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 1; // Number of pages around current page
    const pages: (number | string)[] = [];

    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push('...');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < total - 1) {
      pages.push('...');
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  });

  // Navigation handlers
  goToPage(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  onPageSizeSelect(event: Event) {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(newSize);
  }
}
