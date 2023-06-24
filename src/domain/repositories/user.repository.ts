// Packages
import { Observable } from 'rxjs';

// Models
import { UserModel } from '../models/user.model';

export abstract class UserRepository {
  // * user login
  abstract login(data: {
    email: string;
    password: string;
  }): Observable<UserModel>;
}
