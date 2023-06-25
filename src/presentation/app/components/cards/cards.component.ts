// Pacakages
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

// Entity
import { UserEntity } from '../../../../data/repositories/auth/entities/user.entity';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  // * Variables
  @Input('image') image: string = '';
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Input('id') id: string = '';

  @Output() actDelete: EventEmitter<string> = new EventEmitter();

  isLogged: boolean = false;

  constructor(private readonly store: Store<{ auth: UserEntity }>) {
    this.store.subscribe(({ auth }) => {
      this.isLogged = !!auth.token;
    });
  }

  clickDelete() {
    this.actDelete.emit(this.id);
  }
}
