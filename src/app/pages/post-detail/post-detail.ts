import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../models/category-model';
import { PostModel } from '../../models/post-model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { NgIf,NgFor } from '@angular/common';


@Component({
  selector: 'app-post-detail',
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})


export class PostDetail implements OnInit {
  post?: PostModel;
  categories: CategoryModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.loadPost(id);
    });
    this.loadCategories();
  }

  loadPost(id: number) {
    this.apiService.getPost(id).subscribe((post) => {
      this.post = post;
    });
  }

  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  deletePost() {
    if (this.post && confirm('Are you sure you want to delete this post?')) {
      this.apiService.deletePost(this.post.id).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/posts']);
  }
}
