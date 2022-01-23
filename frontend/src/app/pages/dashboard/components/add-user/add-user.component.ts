import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import Validation from '@core/utils/validation';
import { ValidationMsg } from '@core/utils/validation-messages';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public validationMessages: any;
  public userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {
    this.validationMessages = new ValidationMsg().validationMsg;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        email: [
          '',
          Validators.compose([
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            Validators.required,
          ]),
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.pattern(
              '(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
            ),
            Validators.required,
          ]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const data = { ...this.userForm.value };
    delete data.confirmPassword;
    this.dialogRef.close(data);
    // this.userService.createNewUser(data);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}
