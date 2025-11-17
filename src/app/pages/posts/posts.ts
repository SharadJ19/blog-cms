import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../models/post-model';
import { CategoryModel } from '../../models/category-model';
import { ApiService } from '../../services/api-service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, FormsModule, NgFor, NgIf],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  posts: PostModel[] = [];
  filteredPosts: PostModel[] = [];
  categories: CategoryModel[] = [];
  searchTerm = '';
  selectedCategory = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPosts();
    this.loadCategories();
  }

  loadPosts() {
    this.apiService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = posts;
    });
  }

  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Searches in title and content + both search and category must match !
  filterPosts() {
    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        !this.selectedCategory || post.categoryId.toString() === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete his post?')) {
      this.apiService.deletePost(id).subscribe(() => {
        this.loadPosts();
      });
    }
  }
}
