import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  signupform = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileno: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    dob: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}"
      )
    ]),
    gender: new FormControl('', Validators.required),
  });
  get name() {
    return this.signupform.get('name');
  }
  get email() {
    return this.signupform.get('email');
  }
  get mobileno() {
    return this.signupform.get('mobileno');
  }
  get password() {
    return this.signupform.get('password');
  }
  get dob() {
    return this.signupform.get('dob');
  }
  currentDate: Date = new Date();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  submit: any;
  serverErrorMessage: any;
  onSubmit(form: FormGroup) {
    this.userService
      .postUser(form.value).subscribe(
        (res) => {
          alert('Details submitted succesfully!');

        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessage = err.error.join('<br/>');
          } else {
            this.serverErrorMessage = 'Something Went Wrong';
          }
        }
      );
    console.log('Form Suceesfully submitted');
    this.signupform.reset();
  }
}
