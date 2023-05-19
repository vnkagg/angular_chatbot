import { ActivatedRoute, ParamMap } from '@angular/router';
import { postService } from './../post.service';
import { Component, OnInit } from '@angular/core'
import { Post } from '../post.model';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-input',
  styleUrls: ['input.component.css'],
  templateUrl: 'input.component.html'
})

export class InputComponent implements OnInit{
  isLoading = false;
  title : string = '';
  content : string = '';
  private mode : string = 'create';
  postID : string = ''; // error on just initialising a postID : string;
  fetchedPost : Post = {id : "", title : "", content : "" };
  constructor(public postService: postService, public route : ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has('postID')){
        this.postID = paramMap.get('postID')!; // ! after a statement tells that you are certain that this thing is not null
        this.mode = 'edit'; // also known as the non null assertion operator ---- "!"
        this.postService.getPost(this.postID).subscribe((post) => {
            this.isLoading = false;
            this.fetchedPost = {...post};
            this.title = post.title;
            this.content = post.content;
          });
      }
    });
    this.isLoading = false;
  }
  sendText(form : NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      const post : Post = {
        id : '', //this is just a dummy/temp id
        title : form.value.title,
        content : form.value.content,
      };
      this.postService.addPosts(post);
    }else{
      const post : Post = {
        id : this.postID,
        title : form.value.title,
        content : form.value.content
      }
      this.postService.updatePost(post);
    }

    form.resetForm();
  };
};
