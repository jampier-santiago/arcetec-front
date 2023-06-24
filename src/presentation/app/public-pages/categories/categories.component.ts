// Packages
import { Component, OnInit } from '@angular/core';

// Services
import { CategoriesService } from '../services/categories.service';

// Model
import { CategoryModel } from 'src/domain/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Array<CategoryModel>;

  constructor(private readonly categoriesService: CategoriesService) {
    this.categories = [];
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
