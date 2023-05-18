import { Router } from '@angular/router';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class postService{
  private postsArr : Post[] = [];
  private postUpdater = new Subject<Post[]>();
  constructor(private http : HttpClient, private router : Router){}
  getPostUpdatedListener(){
    return this.postUpdater.asObservable();
  }
  getPost(id : string){ // please clarify this shit of having to put null, can't initialise without declaring, and stuff
    return this.http.get<{message : string, id : string, title : string, content : string}>
    ("http://localhost:8080/api/posts/" + id);
    // const alpha = this.postsArr.find((item) => item.id === id);// try to fetch directly from the server
    // console.log(alpha);
    // return alpha;
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
        this.postsArr = transformedPosts;
        this.postUpdater.next([...transformedPosts]); //the postsArr version was added to implement the getPost method
      });
  }
  addPosts(post : Post){
    this.http.post<{message : string, id_generated : string}>('http://localhost:8080/api/posts', post)
      .subscribe((responseData) => {
        console.log("post.service.ts file/addPosts : ", responseData.message);
        post.id = responseData.id_generated; // this was done to try resolve the put 404 error
        this.postsArr.push(post);
        this.postUpdater.next([...this.postsArr]); //the postsArr version was added to implement the getPost method
        this.router.navigate(['/']);
      });
  }
  updatePost(post : Post) {
    console.log("this post has reached the post service, updatePost method : ", post);
    // the put request is not getting executed only
    this.http.put<{message : string}>('http://localhost:8080/api/posts/' + post.id, post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const temparr = [...this.postsArr];
        temparr[temparr.findIndex((item) => item.id === post.id)] = post;
        this.postsArr = temparr;
        this.postUpdater.next([...this.postsArr]);
        this.router.navigate(['/']);
      });
  }
  deletePost(postID : string){
    this.http.delete<{message : string}>('http://localhost:8080/api/posts/' + postID)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.postsArr = this.postsArr.filter((element) => element.id !== postID);
        this.postUpdater.next([...this.postsArr]); //the postsArr version was added to implement the getPost method
      });
  }
}
