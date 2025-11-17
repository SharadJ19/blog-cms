import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { PostModel } from '../models/post-model';
import { CategoryModel } from '../models/category-model';

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
  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.apiUrl}/posts`);
  }

  // GET one
  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.apiUrl}/posts/${id}`);
  }

  // POST
  createPost(post: Omit<PostModel, 'id'>): Observable<PostModel> {
    return this.http.post<PostModel>(`${this.apiUrl}/posts`, post);
  }

  // PUT
  updatePost(id: number, post: PostModel): Observable<PostModel> {
    return this.http.put<PostModel>(`${this.apiUrl}/posts/${id}`, post);
  }

  // DELETE
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }

  // ==============================
  //   Categories CRUD Operations
  // ==============================

  // GET all
  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.apiUrl}/categories`);
  }

  // POST
  createCategory(category: Omit<CategoryModel, 'id'>): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(`${this.apiUrl}/categories`, category);
  }

  // PUT
  updateCategory(id: number, category: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.apiUrl}/categories/{id}`, category);
  }

  // DELETE
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }
}
