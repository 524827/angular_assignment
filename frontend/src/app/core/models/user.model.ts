export interface UserModel {
 _id?: string;
 firstName: string;
 lastName: string;
 email: string;
 phone: string,
 password?: string,
 updatedAt?: Date,
 createdAt?: Date
}

export interface UserTableFields {
  id: number,
  firstName: string;
  lastName: string;
  email: string;
  phone: string,
  createdAt: Date
}
