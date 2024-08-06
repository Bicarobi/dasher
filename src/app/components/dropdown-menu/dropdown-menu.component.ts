import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
})
export class DropdownMenuComponent {
  @ViewChild('filterButton') filterButton!: ElementRef;

  isDropdownActive: boolean = false;
  selectedFilter: any;

  filters = [
    { name: 'Option 1', value: 'option-1' },
    { name: 'Option 2', value: 'option-2' },
    { name: 'Option 3', value: 'option-3' },
  ];

  @HostListener('document:click', ['$event'])
  clickedOut(event: MouseEvent) {
    if (
      this.filterButton &&
      !this.filterButton.nativeElement.contains(event.target)
    ) {
      this.isDropdownActive = false;
    }
  }
}
