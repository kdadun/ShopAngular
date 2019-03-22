import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private authentication: AuthenticationService,
     ) { }

  ngOnInit() {
  }
  onSubmit(registrationForm: FormGroup) {
    if (registrationForm.valid) {
      const roles = 'User';
    this.authentication.registerUser(registrationForm.value, roles).
     subscribe((data: any) => {
        if (data.Succeeded === true) {
          this.router.navigate(['/home']);
       }
      });
    } else {
      console.log('error');
    }
  }
  registrationForm = this.formBuilder.group(
    {
      username: new FormControl('', Validators.required, this.validateUserNameTaken.bind(this)),
      password: new FormControl('', [ Validators.required, Validators.minLength(3),
      this.validatePassword({lowercase: true, uppercase: true, number: true})]),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl(),
      lastName: new FormControl()
  });

  validatePassword(options: {
    uppercase?: boolean,
    lowercase?: boolean,
    number?: boolean,
    special?: boolean
  } ): ValidatorFn {
     return (control: FormControl) => {

    const hasUppercase = control.value.match(/[A-Z]/);
    const hasLowercase = control.value.match(/[a-z]/);
    const hasNumber = control.value.match(/[\d]/);
    const hasSpecial = control.value.match(/[\W]/);

     const errors = {};
     let valid = true;

          if (options.lowercase && !hasLowercase) {
            errors['lowercase'] = true;
            valid = false;
          }
          if (options.uppercase && !hasUppercase) {
            errors['uppercase'] = true;
            valid = false;
          }
          if (options.number && !hasNumber) {
            errors['number'] = true;
            valid = false;
          }
          if (options.special && !hasSpecial) {
            errors['special'] = true;
            valid = false;
          }
     return  valid ? null : { 'password': errors };

      };
}
validateUserNameTaken(control: AbstractControl) {
  return this.authentication.TakeUsernameIfExist(control.value).then(res => {
    return res ?  { userName:  true } : null ;
  });
}
}
