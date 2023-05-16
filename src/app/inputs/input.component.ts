import { postService } from './../post.service';
import { Component } from '@angular/core'
import { Post } from '../post.model';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-input',
  styleUrls: ['input.component.css'],
  templateUrl: 'input.component.html'
})

export class InputComponent{
  title : string = '';
  content : string = '';

  constructor(public postService: postService) {}

  //@Output() postCreated  = new EventEmitter<Post>();
  sendText(form : NgForm){
    if(form.invalid){
      return;
    }
    const post : Post = {
                  id : '', //this is just a dummy/temp id
                  title : form.value.title,
                  content : form.value.content,
                };
                //console.log(post);
    this.postService.addPosts(post);
    //this.postCreated.emit(post);
    form.resetForm();
  };
};
