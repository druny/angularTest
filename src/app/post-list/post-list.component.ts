import { Component, OnInit } from '@angular/core';

import { PostListService } from '../Services/Post/post-list.service';

import { Post } from './Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[];

  constructor(private postListService: PostListService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postListService.getPosts()
      .subscribe(posts => { console.log(posts); this.posts = posts});
  }

  add(post: Post): void {
    if (!post.title && ! post.body) return;
  
    this.postListService.addPost({ post } as Post)
      .subscribe(post => this.posts.push(post));
  }

  remove(post: Post): void {
    this.posts = this.posts.filter(({ id }) => id !== post.id);

    this.postListService.deletePost(post).subscribe();
  }
}
