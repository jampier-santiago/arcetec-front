// Packages
import { Observable } from 'rxjs';

// Base
import { UseCase } from 'src/base/use-cases';

// Repository
import { UserRepository } from '../repositories/user.repository';

// Model
import { UserModel } from '../models/user.model';

export class LoginUseCase
  implements UseCase<{ email: string; password: string }, UserModel>
{
  constructor(private readonly userRepository: UserRepository) {}

  // * Implementation of the use case, the login of a user
  execute(params: { email: string; password: string }): Observable<UserModel> {
    return this.userRepository.login(params);
  }
}
