// Model
import { CategoryModel } from '../../../../domain/models/category.model';

// * Category structure returned by endpoints
export interface CategoryEntity extends CategoryModel {
  id?: string;
}
