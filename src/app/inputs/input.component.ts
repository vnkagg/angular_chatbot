import { ActivatedRoute, ParamMap } from '@angular/router';
import { postService } from './../post.service';
import { Component, OnInit } from '@angular/core'
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-input',
  styleUrls: ['input.component.css'],
  templateUrl: 'input.component.html'
})

export class InputComponent implements OnInit{
  isLoading = false;
  title : string = '';
  content : string = '';
  // ratio : string = '';
  postID : string = ''; // error without initialising a value
  fetchedPost : Post = {id : "", title : "", content : "", imagePath : "", creator : ""};
  form! : FormGroup;
  imagePreview : string = '';
  private mode : string = 'create';
  constructor(public postService: postService, public route : ActivatedRoute) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      title : new FormControl(null, {validators : [Validators.required, Validators.minLength(4)]}),
      content : new FormControl(null, {validators : [Validators.required]}),
      image : new FormControl(null, {validators : [Validators.required], asyncValidators : [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has('postID')){
        this.postID = paramMap.get('postID')!; // ! after a statement tells that you are certain that this thing is not null
        this.mode = 'edit'; // also known as the non null assertion operator ---- "!"
        this.isLoading = true;
        this.postService.getPost(this.postID).subscribe((post) => {
            this.isLoading = false;
            this.fetchedPost = {...post};
            this.imagePreview = post.imagePath;
            this.form.setValue({
              title : post.title,
              content : post.content,
              // image : post.imagePath
              image : null
            });
          });
        this.form.clearValidators();
      }
    });
    this.isLoading = false;
  }
  imagePicked(event: Event) {
    // this.calculate(event);
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      this.form.patchValue({ image: file }); // -------------------------------- the image was set here
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        // const width = (reader.result as HTMLImageElement).naturalWidth;
      };
      reader.readAsDataURL(file);
    }
  }
  // calculate(event : Event){
  //   const img = event.target as HTMLImageElement;
  //   const width = img.naturalWidth;
  //   const height = img.naturalHeight;
  //   const ratio : string = "$(width/ height)";
  //   this.ratio = ratio;
  // }

  sendText(){
    //this.form.get('image')?.value && this.mode === 'edit'  // peace

    if(this.form.invalid && this.mode === "create"){
      console.log("debug pt2");
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      const post : Post = {
        id : '', //this is just a dummy/temp id
        title : this.form.value.title,
        content : this.form.value.content,
        imagePath : '', //this.ratio
        creator : ''
      };
      this.postService.addPosts(post, this.form.value.image); // revisit
    }else{
      this.postService.updatePost(this.postID, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();
  };
};
