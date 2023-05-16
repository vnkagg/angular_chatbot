import { postService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  posts : Post[] = [];
  postSub : Subscription = new Subscription;

  constructor(public postService : postService) {}

  deletePost(id : string){
    this.postService.deletePost(id);
  }

  ngOnInit(): void {
    //this.posts = this.postService.getPosts();
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdatedListener()
      .subscribe((storePost : Post[]) => {
        this.posts = storePost;
      });
  }
}
