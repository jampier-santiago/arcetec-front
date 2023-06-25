// Packages
import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Actions
import { addData } from '../redux/auth.actions';

// Services
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // * Form fields
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly store: Store<{ auth: any }>
  ) {}

  // * form submission
  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    // * Validate the state of the form
    if (this.form.status === 'VALID') {
      this.authService
        .login({
          email: email ?? '',
          password: password ?? '',
        })
        .subscribe({
          next: (data) => {
            this.store.dispatch(addData(data!!));
            this.router.navigate(['/dashboard/categorias']);
          },
          error: (error) => {
            const { error: dataError } = error;

            // * Data structure or credential error
            if (dataError.statusCode === 400 || dataError.statusCode === 401) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error con las credenciales.',
                detail: 'Los datos ingresados no son válidos.',
              });

              return;
            }

            //  * server error
            this.messageService.add({
              severity: 'error',
              summary: 'Error con el servidor',
              detail:
                'En este momento tenemos un error con nuestro servidor. Intente ingresar en otro momento.',
            });
          },
        });
    }
  }
}
