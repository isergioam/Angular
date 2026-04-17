import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-message.component.html',
  styleUrl: './ui-message.component.css'
})
export class UiMessageComponent {
  @Input() texto = '';
  @Input() tipo: 'info' | 'success' | 'error' | 'warning' = 'info';
}