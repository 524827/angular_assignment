import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserModel } from '@core/models/user.model';
import { ValidationMsg } from '@core/utils/validation-messages';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public validationMessages: any;
  public userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    public dialogRef: MatDialogRef<EditUserComponent>
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
      }
    );
    console.log('>>>>>>>', this.data)
    this.userForm.setValue(this.data);
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
}
