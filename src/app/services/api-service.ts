import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { Post } from '../models/post-model';
import { Category } from '../models/category-model';


@Injectable({
  providedIn: 'root',
})


export class ApiService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  // =========================
  //   Posts CRUD Operations
  // =========================

  // GET all
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  // GET one
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  // POST
  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }

  // PUT
  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${id}`, post);
  }

  // DELETE
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }

  // ==============================
  //   Categories CRUD Operations
  // ==============================

  // GET all
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // POST
  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category);
  }

  // PUT
  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/categories/${id}`, category);
  }

  // DELETE
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }
  
}