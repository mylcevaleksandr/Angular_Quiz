import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(/^[А-Я][а-я]+\s*$/), Validators.required]),
    lastName: new FormControl('', [Validators.pattern(/^[А-Я][а-я]+\s*$/), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/), Validators.required]),
    agree: new FormControl(false, [Validators.required])
  });

  ngOnInit() {
  }

  signup(): void {
    console.log(this.signupForm.value)
  }
}
