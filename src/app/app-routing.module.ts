import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedListComponent } from './feed/feed-list/feed-list.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [
  { path: '', component: FeedListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'post', component: PostCreateComponent },
  {
    path: 'edit/:postId',
    component: PostCreateComponent,
  },
  { path: 'news', component: NewsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
