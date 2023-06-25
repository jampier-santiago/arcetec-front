// Packages
import { createReducer, on } from '@ngrx/store';

// Actions
import { addData } from './auth.actions';

// Entity
import { UserEntity } from '../../../../data/repositories/auth/entities/user.entity';

export const initialState: UserEntity = {
  email: '',
  id: '',
  name: '',
  token: '',
};

export const authReducer = createReducer(
  initialState,
  on(addData, (state, payload) => ({ ...payload }))
);
