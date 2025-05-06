import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  pageIndex = input<number>(1);
  pageSize = input.required<number>();
  total = input.required<number>();

  sizeOptions = input([5, 10, 20]);

  pagesTotal = computed(() => Math.ceil(this.total() / this.pageSize()));
  pages = computed(() => Array.from({length: this.pagesTotal()}, (_, i) => i + 1));

  pageChange = output<number>();
  sizeChange = output<number>();

  onSelect(event: Event) {
    event.preventDefault();
    this.sizeChange.emit(parseInt((event.target as HTMLSelectElement).value));
  }

}
