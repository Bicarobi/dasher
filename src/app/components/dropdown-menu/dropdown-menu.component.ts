import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
})
export class DropdownMenuComponent {
  @ViewChild('button') button!: ElementRef;

  @Input() dropdownName!: string;
  @Input() options!: { name: string; value: string }[];

  @Output() selectedOptionEmit = new EventEmitter<any>();
  @Output() clearedOptionEmit = new EventEmitter<boolean>();

  isDropdownActive: boolean = false;
  selectedOption: any;

  @HostListener('document:click', ['$event'])
  clickedOut(event: MouseEvent) {
    if (this.button && !this.button.nativeElement.contains(event.target)) {
      this.isDropdownActive = false;
    }
  }

  clicked() {
    this.selectedOptionEmit.emit(this.selectedOption);
  }

  cleared() {
    this.clearedOptionEmit.emit(true);
  }

  log(value: any) {
    console.log(value);
  }
}
