import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/post/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  isSignedIn: boolean = false;
  private postsSub!: Subscription;

  constructor(public postsService: PostsService, private auth: AuthService) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isSignedIn = isLoggedIn;
    });
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(event: Event, postId: string) {
    event?.preventDefault();
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
