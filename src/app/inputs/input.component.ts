import { Component, EventEmitter, Output } from '@angular/core'
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
  @Output() postCreated  = new EventEmitter<Post>();
  sendText(form : NgForm){
    if(form.invalid){
      return;
    }
    const post : Post = {
                  id : -1, //this is just a dummy/temp id, it is supposed to be modified in app.component
                  title : form.value.title,
                  content : form.value.content
                };
                console.log(post);

    this.postCreated.emit(post);
  };
};
