// Packages
import { createAction, props } from '@ngrx/store';

// Entity
import { UserEntity } from '../../../../data/repositories/auth/entities/user.entity';

// Actions
export const addData = createAction(
  '[Auth Component] Add data',
  props<UserEntity>()
);
