import { Component, NgModule, OnInit } from '@angular/core';
import { Post } from '../../models/post-model';
import { Category } from '../../models/category-model';
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

  post: Omit<Post, 'id'> = {
    title: '',
    content: '',
    author: '',
    categoryId: '',
    tags: [],
    date: new Date().toISOString().split('T')[0],
    thumbnail: '',
  };

  categories: Category[] = [];
  tagsInput = '';
  isEdit = false;
  postId?: string;

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
        this.postId = params['id'] as string;
        this.loadPost(this.postId);
      }
    });
  }

  
  loadPost(id: string) {
    this.apiService.getPost(id).subscribe((post) => {
      const {id: _id,...rest } = post;
      this.post = {...rest};
      this.tagsInput = post.tags.join(', ');
    });
  }


  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }


  onSubmit() {
    const postData:Omit<Post,'id'> = {
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
        } as Post)
        .subscribe(() => this.router.navigate(['/posts']));
    } else {
      this.apiService.createPost(postData).subscribe(() => this.router.navigate(['/posts']));
    }
  }


  goBack() {
    this.router.navigate(['/posts']);
  }

}
