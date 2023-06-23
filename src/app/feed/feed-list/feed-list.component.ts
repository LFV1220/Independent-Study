import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/post/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub!: Subscription;
  // posts = [
  //   {
  //     title: 'Post 1',
  //     content: 'This is the content of post 1.',
  //   },
  //   {
  //     title: 'Post 2',
  //     content: 'This is the content of post 2.',
  //   },
  //   // Add more posts as needed
  // ];

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
