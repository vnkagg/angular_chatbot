import { AuthService } from './../auth/auth.service';
import { postService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  total_pages = 5;
  postsperPage = 2;
  total_posts = 0;
  optforpageSize = [1,2,3,4,5];
  current_page = 1;
  posts : Post[] = [];
  postSub : Subscription = new Subscription;
  isLoading = false;
  isAuth = false;
  authSub : Subscription = new Subscription;

  constructor(public postService : postService, public AuthService : AuthService) {}
  deletePost(id : string){
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.current_page, this.postsperPage);
    });
  }
  pageEvent( page : PageEvent){
    this.isLoading = true;
    this.current_page = page.pageIndex + 1;
    this.postsperPage = page.pageSize;
    this.total_pages = page.length;
    this.postService.getPosts(this.current_page, this.postsperPage);
    console.log(page);
  }

  ngOnInit(): void {
    this.calculateParentContainerHeight();
    this.isAuth = this.AuthService.getisAuth();
    this.authSub = this.AuthService.isAuth().subscribe(status => {
      this.isAuth = status;
    });
    this.postService.getPosts(this.current_page, this.postsperPage);
    this.isLoading = true;
    this.postSub = this.postService.getPostUpdatedListener()
      .subscribe((receive : {total : number, posts : Post[]}) => {
        this.isLoading = false;
        this.total_posts = receive.total;
        this.calculateParentContainerHeight();
        this.posts = receive.posts;
      });
  }





  calculateParentContainerHeight() {
    setTimeout(() => {
      // console.log("debug");
      const parentContainer = document.getElementsByClassName('parent-container');
      // console.log(parentContainer);
      const childContainers = document.getElementsByClassName('child-container') as HTMLCollection;
      // console.log("child", childContainers);
      for(let i = 0; i<childContainers.length; i+=2){
        // console.log("please ",(childContainers[i] as HTMLElement).offsetHeight);
        // console.log(i/2 + "th iteration : ", "text : ", (childContainers[i] as HTMLElement).offsetHeight, ", image : ", (childContainers[i+1] as HTMLElement).offsetHeight);
        if ((childContainers[i] as HTMLElement).offsetHeight > (childContainers[i+1] as HTMLElement).offsetHeight){
          (parentContainer[i/2] as HTMLElement).style.height = (childContainers[i+1] as HTMLElement).offsetHeight + 'px';
        }
        // console.log("heights", (parentContainer[i/2] as HTMLElement).style.height);
        }
      // console.log('after loop');
    }, 1000);

  }
}
