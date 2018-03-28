import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent implements OnInit {

  form: FormGroup;
  messageClass;
  message;
  username;
  email;


  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.createForm();
   }

   createForm() {
    this.form = this.FormBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3 ),
        Validators.maxLength(15),
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
      ])],
      arrival: ['', Validators.required],
      departure: ['', Validators.required],
      adults: ['', Validators.required],
      children: ['', Validators.required],
      condition: ['', Validators.required]
    })

    
  }

  onBookSubmit(){

    console.log(this.username);
    console.log(this.username + this.email);
    
    const book = {
      name: this.username,
      email: this.email,
      phone: this.form.get('phone').value,
      address: this.form.get('address').value,
      arrival: this.form.get('arrival').value,
      departure: this.form.get('departure').value,
      adults: this.form.get('adults').value,
      children: this.form.get('children').value,
      condition: this.form.get('condition').value

    };
    this.authService.bookHotel(book).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    });
  }



  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;
 
    });
    
  }

}
