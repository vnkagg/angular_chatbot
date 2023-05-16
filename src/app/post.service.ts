import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class postService{
  private postUpdater = new Subject<Post[]>();
  constructor(private http : HttpClient){}

  getPostUpdatedListener(){
    return this.postUpdater.asObservable();
  }
  getPosts(){
    this.http.get<{message : string, posts : [{title : string, content : string, _id : string}]}>('http://localhost:8080/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {id : post._id,
                title : post.title,
                content : post.content}
      })
    }))
      .subscribe((transformedPosts) => {
        this.postUpdater.next([...transformedPosts]);
      });
  }
  addPosts(post : Post){
    this.http.post<{message : string}>('http://localhost:8080/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.getPosts();
      });
  }
  deletePost(postID : string){
    this.http.delete<{message : string}>('http://localhost:8080/api/posts/' + postID)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.getPosts();
      });
  }
}
// mongodb username: vnkaggarwal1 password: ZWzeRMwib0Ww2Ohv
