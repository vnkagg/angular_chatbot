import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({providedIn : 'root'})
export class postService{
  private storePost : Post[] = [];
  private postUpdater = new Subject<Post[]>();

  constructor(private http : HttpClient){}

  getPostUpdatedListener(){
    return this.postUpdater.asObservable();
  }
  getPosts(){
    this.http.get<{message : string, posts : Post[]}>('http://localhost:8080/api/posts')
      .subscribe((postdata) => {
        this.storePost = postdata.posts;
        this.postUpdater.next([...this.storePost]);
      });
    // WHY WAS THE POST NOT SHOWING ON LOAD, WHEN THE POST UPDATEER WAS CALLED AFTER THE HTTPS REQUEST.
    //this.postUpdater.next([...this.storePost]);
    /* answer - http requests are async + they take some time. so just when they were executed,
       the next parallel sister block got executed and fetched an empty array
       instead of the http fetched array*/
  }
  addPosts(post : Post){
    post.id = Math.random();
    post.api_call = "to_be_added";
    this.http.post<{message : string}>('http://localhost:8080/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.getPosts();
      });
  }
  deletePost(post : Post){
    post.api_call = "to_be_deleted";
    this.http.post<{message : string}>('http://localhost:8080/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData);
        this.getPosts();
      });
    //this.storePost = this.storePost.filter((post) => post.id!==id);
    //this.postUpdater.next([...this.storePost]);
  }
}
