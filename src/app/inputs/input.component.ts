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
                  id : -1, //this is just a dummy/temp id, it is supposed to be modified in app.component
                  title : form.value.title,
                  content : form.value.content,
                  api_call : "bazinga_this_is_a_random_string_because_it_doesnt_affect"
                };
                //console.log(post);
    this.postService.addPosts(post);
    //this.postCreated.emit(post);
    form.resetForm();
  };
};
