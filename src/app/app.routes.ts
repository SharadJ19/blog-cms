import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Posts } from './pages/posts/posts';
import { PostForm } from './pages/post-form/post-form';
import { PostDetail } from './pages/post-detail/post-detail';
import { Categories } from './pages/categories/categories';



export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'posts', component: Posts },
  { path: 'posts/new', component: PostForm },
  { path: 'posts/:id/edit', component: PostForm },
  { path: 'posts/:id', component: PostDetail },
  { path: 'categories', component: Categories },

];