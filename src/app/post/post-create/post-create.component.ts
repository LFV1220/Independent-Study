import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Type } from './type.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string | null = null;
  form: FormGroup = new FormGroup({});
  post!: Post;
  title: string = '';
  content: string = '';
  imagePreview: string | null = null;
  isLoading = false;
  isSignedIn: boolean = false;
  userEmail: string = '';

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isSignedIn = isLoggedIn;
    });
    this.auth.email$.subscribe((email: string) => {
      this.userEmail = email;
    });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [Type],
      }),
      creator: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId!).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: this.userEmail,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
            creator: this.post.creator,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file!);
  }

  onSavePost() {
    if (
      this.form.value.title === null ||
      this.form.value.title === '' ||
      this.form.value.title.length < 2
    ) {
      alert('Please enter a valid title!');
      return;
    }
    if (
      this.form.value.content === null ||
      this.form.value.content === '' ||
      this.form.value.title.length < 2
    ) {
      alert('Please enter some valid post content!');
      return;
    }
    if (this.form.value.image === null || this.form.value.image === '') {
      alert('Please select an image!');
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image,
        this.userEmail
      );
    } else {
      this.postsService.updatePost(
        this.postId!,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image,
        this.form.value.creator
      );
    }

    this.form.reset();
  }
}
