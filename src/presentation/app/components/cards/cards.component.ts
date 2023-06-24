import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  @Input('image') image: string = '';
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Input('id') id: string = '';
}
