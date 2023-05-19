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
  calculateParentContainerHeight() {

      // const containers = document.querySelectorAll('.container');
      // let parentContainers! : Element;
      // containers.forEach((container) => {
      //   parentContainers.push(
      //     container.querySelector('.parent-container')
      //   )}
      // );
      // let childContainers;
      // parentContainers.forEach((parentContainer : Element) => {
      //   childContainers.push(parentContainer.querySelectorAll('.child-container'));
      // });

      // let minHeight = (childContainers[0] as HTMLElement).offsetHeight;
      // childContainers.forEach(container => {
      //   const containerHeight = (container as HTMLElement).offsetHeight;
      //   if (containerHeight < minHeight) {
      //     minHeight = containerHeight;
      //   }
      // });
      // parentContainer.style.height = `${minHeight}px`;
      setTimeout(() => {
        console.log("debug");
        const parentContainer = document.getElementsByClassName('parent-container');
        console.log(parentContainer);
        const childContainers = document.getElementsByClassName('child-container') as HTMLCollection;
        console.log("child", childContainers);

        for(let i = 0; i<childContainers.length; i+=2){
          console.log("please ",(childContainers[i] as HTMLElement).offsetHeight);
          console.log(i/2 + "th iteration : ", "text : ", (childContainers[i] as HTMLElement).offsetHeight, ", image : ", (childContainers[i+1] as HTMLElement).offsetHeight);
          if ((childContainers[i] as HTMLElement).offsetHeight > (childContainers[i+1] as HTMLElement).offsetHeight){
            (parentContainer[i/2] as HTMLElement).style.height = (childContainers[i+1] as HTMLElement).offsetHeight + 'px';
          }
          console.log("heights", (parentContainer[i/2] as HTMLElement).style.height);
          }
        console.log('after loop');
      }, 2000);

  }
  ngOnInit(): void {
    this.calculateParentContainerHeight();
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
