import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Post } from '../../models/post-model';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})


export class Dashboard implements OnInit {
  postsCount = 0;
  categoriesCount = 0;
  recentPosts: Post[] = [];

  // we could also use inject keyword for using ApiService (modern way)
  constructor(private apiService: ApiService) {}

  ngOnInit(){
    this.loadData();
  }


  loadData() {
    // fetching the last 5 posts
    this.apiService.getPosts().subscribe((posts) => {
      this.postsCount = posts.length;
      this.recentPosts = posts.slice(-5).reverse();
    });

    // fetching the no of categories
    this.apiService.getCategories().subscribe((categories) => {
      this.categoriesCount = categories.length;
    });
  }
}
