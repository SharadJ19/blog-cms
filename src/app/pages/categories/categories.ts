import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category-model';
import { Post } from '../../models/post-model';
import { ApiService } from '../../services/api-service';
import { NgIf, NgFor } from "@angular/common";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-categories',
  imports: [NgIf, FormsModule, NgFor],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})


export class Categories implements OnInit {

  categories: Category[] = [];
  posts: Post[] = [];
  showAddForm = false;
  newCategoryName = '';
  editingCategory?: Category;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadPosts();
  }


  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }


  loadPosts() {
    this.apiService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }


  getPostCount(categoryId: number): number {
    return this.posts.filter((post) => post.categoryId === categoryId).length;
  }


  addCategory() {
    if (this.newCategoryName) {
      this.apiService.createCategory({ name: this.newCategoryName }).subscribe(() => {
        this.loadCategories();
        this.cancelAdd();
      });
    }
  }


  cancelAdd() {
    this.showAddForm = false;
    this.newCategoryName = '';
  }


  editCategory(category: Category) {
    this.editingCategory = { ...category };
  }

  updateCategory() {
    if (this.editingCategory) {
      this.apiService
        .updateCategory(this.editingCategory.id, this.editingCategory)
        .subscribe(() => {
          this.loadCategories();
          this.cancelEdit();
        });
    }
  }


  cancelEdit() {
    this.editingCategory = undefined;
  }


  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.apiService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }


}