import { Component, NgModule, OnInit } from '@angular/core';
import { PostModel } from '../../models/post-model';
import { CategoryModel } from '../../models/category-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-post-form',
  imports: [FormsModule, NgFor],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})


export class PostForm implements OnInit {
  post: Omit<PostModel, 'id'> = {
    title: '',
    content: '',
    author: '',
    categoryId: 0,
    tags: [],
    date: new Date().toISOString().split('T')[0],
    thumbnail: '',
  };

  categories: CategoryModel[] = [];
  tagsInput = '';
  isEdit = false;
  postId?: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.postId = +params['id'];
        this.loadPost(this.postId);
      }
    });
  }

  loadPost(id: number) {
    this.apiService.getPost(id).subscribe((post) => {
      this.post = post;
      this.tagsInput = post.tags.join(', ');
    });
  }

  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    const postData = {
      ...this.post,
      tags: this.tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    if (this.isEdit && this.postId) {
      this.apiService
        .updatePost(this.postId, {
          ...postData,
          id: this.postId,
        } as PostModel)
        .subscribe(() => this.router.navigate(['/posts']));
    } else {
      this.apiService.createPost(postData).subscribe(() => this.router.navigate(['/posts']));
    }
  }

  goBack() {
    this.router.navigate(['/posts']);
  }
}
