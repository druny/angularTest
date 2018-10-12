import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from '../../post-list/Post';
import { MessageService } from '../Message/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostListService {
  posts: Post[] = [];

  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  private log(message: string) {
    this.messageService.add(`Post: ${message}`);
  }

  private handleError(operation, result) {
    return (error: any) => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result);
    }
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        tap(posts => this.log('Get posts request')),
        catchError(this.handleError('getPosts', [])),
      )
  }

  addPost(post: Post): Observable<Post> {
    this.log(`Added post id=${post.id}`)

    return of(post);
  }

  deletePost (post: Post): Observable<Post> {
    this.log(`Deleted post id=${post.id}`)

    return of(post);
  }
}
