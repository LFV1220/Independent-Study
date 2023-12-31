import { Injectable } from '@angular/core';
import { Post } from '../post/post.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'https://independent-study-project.onrender.com/api/posts'
      )
      .pipe(
        map((postData) => {
          return postData.posts.map(
            (post: {
              title: string;
              content: string;
              _id: string;
              imagePath: string;
              creator: string;
            }) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
              };
            }
          );
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return { ...this.posts.find((p) => p.id === id) };

    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>('https://independent-study-project.onrender.com/api/posts/' + id);
  }

  addPost(title: string, content: string, image: File, creator: string) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    if (image) {
      postData.append('image', image, title);
    }
    postData.append('creator', creator);
    this.http
      .post<{ message: string; post: Post }>(
        'https://independent-study-project.onrender.com/api/posts',
        postData
      )
      .subscribe((responseData) => {
        console.log('responseData: ', responseData);
        const imagePath = responseData.post.imagePath
          ? responseData.post.imagePath
          : '';
        console.log('imagePath: ', imagePath);
        const post: Post = {
          id: responseData.post.id,
          title: title,
          content: content,
          imagePath: imagePath,
          creator: responseData.post.creator,
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(
    id: string,
    title: string,
    content: string,
    image: File | string,
    creator: string
  ) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
      postData.append('creator', creator);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: creator,
      };
    }
    this.http
      .put(
        'https://independent-study-project.onrender.com/api/posts/' + id,
        postData
      )
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === id);
        const updatedPost: Post = {
          id: id,
          title: title,
          content: content,
          imagePath: '',
          creator: creator,
        };
        updatedPosts[oldPostIndex] = updatedPost;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete<{ message: string }>(
        'https://independent-study-project.onrender.com/api/posts/' + postId
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
