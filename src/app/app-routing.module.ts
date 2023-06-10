import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedListComponent } from './feed/feed-list/feed-list.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component: FeedListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'post', component: PostCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
