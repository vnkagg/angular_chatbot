import { Post } from './post.model';
import { Injectable } from '@angular/core';
@Injectable({providedIn : 'root'})
export class postService{
  private storePost : Post[] = [];
  getPosts(){
    return [...this.storePost]
  }
  addPosts(post : Post){
    this.storePost.push(post);
  }
  deletePost(id : number){
    this.storePost = this.storePost.filter((post) => post.id!==id);
  }
}
