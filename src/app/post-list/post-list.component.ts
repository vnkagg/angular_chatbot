import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Post } from '../post.model';
import { postService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts : Post[] = [];
  @Output() tobedeleted = new EventEmitter();
  deletePost(id : number){
    this.tobedeleted.emit(id);
  }
  postservice : postService;
  constructor(service: postService){
    this.postservice = service;
  }
}
