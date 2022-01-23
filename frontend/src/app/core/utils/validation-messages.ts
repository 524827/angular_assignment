export class ValidationMsg {
  public validationMsg = {
    firstName: [{ type: 'required', message: 'first name is required.' }],
    lastName: [{ type: 'required', message: 'Last name is required.' }],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter valid email.' },
    ],
    phone: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Please enter valid phone.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long',
      },
      {
        type: 'pattern',
        message:
          ' atleast 1 lowerCase, 1 upperCase, 1 numeric or special character & 8 character',
      },
    ],
    confirmPassword: [
      { type: 'matching', message: 'password not match.' },
      { type: 'required', message: 'required.' },
    ],
  };
}
