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
  isLoading = false;

  constructor(public postService : postService) {}

  deletePost(id : string){
    this.postService.deletePost(id);
  }

  ngOnInit(): void {
    this.isLoading = true;
    //this.posts = this.postService.getPosts();
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdatedListener()
      .subscribe((storePost : Post[]) => {
        this.isLoading = false;
        this.posts = storePost;
      });
  }
}
