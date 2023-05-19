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
    return this.http.get<{message : string, id : string, title : string, content : string, imagePath : string}>
    ("http://localhost:8080/api/posts/" + id);
  }
  getPosts(){
    this.http.get<{message : string, posts : [{_id : string, title : string, content : string, imagePath : string}]}>('http://localhost:8080/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {id : post._id,
                title : post.title,
                content : post.content,
                imagePath : post.imagePath}
      })
    }))
      .subscribe((transformedPosts) => {
        this.postsArr = transformedPosts;
        this.postUpdater.next([...transformedPosts]); //the postsArr version was added to implement the getPost method
      });
  }
  updatePost(id : string, title : string, content:string, image: null | File) {
    console.log("debug");
    if(image){
      const postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image);
      this.http.put<{newPath : string}>('http://localhost:8080/api/posts/' + id, postData)
        .subscribe((responseData) => {
          const post = {id : id, title : title, content : content, imagePath : responseData.newPath};
          this.postsArr[this.postsArr.findIndex((item) => item.id === id)] = {...post};
          this.postUpdater.next([...this.postsArr]);
          this.router.navigate(['/']);
        })
    }else{
      // the user can send an imagePath
      const path = this.postsArr[this.postsArr.findIndex((item) => item.id === id)].imagePath;
      const post : Post = {id : id, title : title, content : content, imagePath : path};
      console.log("this post has reached the post service, updatePost method : ", post);

      this.http.put<{message : string}>('http://localhost:8080/api/posts/' + post.id, post)
        .subscribe((responseData) => {
          console.log(responseData.message);
          const temparr = [...this.postsArr];
          temparr[temparr.findIndex((item) => item.id === post.id)] = {...post};
          this.postsArr = temparr;
          this.postUpdater.next([...this.postsArr]);
          this.router.navigate(['/']);
      });
    }
  }
  addPosts(post : Post, image: File){
    const postData = new FormData();
    postData.append("title", post.title);
    postData.append("content", post.content);
    postData.append("image", image, post.title);
    this.http.post<{message : string, id_generated : string, imagePath : string}>('http://localhost:8080/api/posts', postData)
      .subscribe((responseData) => {
        console.log("post.service.ts file/addPosts : ", responseData.message);
        post.id = responseData.id_generated; // this was done to try resolve the put 404 error
        post.imagePath = responseData.imagePath;
        this.postsArr.push(post);
        this.postUpdater.next([...this.postsArr]); //the postsArr version was added to implement the getPost method
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
