import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

import { UserModel, UserTableFields } from '@core/models/user.model';
import { AlertService } from '@core/services/alert.service';
import { UserService } from '@core/services/user.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '@/shared/components/confirm-dialog/confirm-dialog.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'createdAt',
    'action',
  ];
  usersList: UserModel[] = [];
  dataSource!: MatTableDataSource<UserTableFields>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  /**
   * Get all users
   */
  getUserList(): void {
    this.userService.getAllUsers().subscribe((res) => {
      const userList: UserTableFields[] = res.result.map(
        (item: UserModel, index: number) => {
          return {
            id: index,
            _id: item._id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phone: item.phone,
            createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
          };
        }
      );
      this.dataSource = new MatTableDataSource(userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addNewUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '1000px',
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: `, result);
      if (result) {
        this.createNewUser(result);
      }
    });
  }

  onEditUser(row: UserModel) {
    const editData = {
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
    };
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '1000px',
      data: editData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: `, result, row);
      if (result) {
        this.editUser(result, row._id);
      }
    });
  }

  createNewUser(user: UserModel) {
    this.userService.createNewUser(user).subscribe(
      (res) => {
        if (res.code === 200) {
          this.alertService.showAlert('Success', res.msg, 'success');
          this.getUserList();
        }
      },
      (err) => {
        if (err?.error?.code === 409) {
          this.alertService.showAlert('Error', err?.error?.msg, 'warning');
        } else {
          this.alertService.showAlert(
            'Error',
            'Failed to create new user',
            'error'
          );
        }
      }
    );
  }

  editUser(user: UserModel, id: string | undefined) {
    this.userService.editUserDetails(user, id).subscribe(
      (res) => {
        if (res.code === 200) {
          this.alertService.showAlert('Success', res.msg, 'success');
          this.getUserList();
        }
      },
      (err) => {
        this.alertService.showAlert('Error', 'Failed to edit user', 'error');
      }
    );
  }

  confirmDialog(row: UserModel): void {
    const message = `Are you sure you want to delete this user?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.deleteUser(row._id);
      }
    });
  }

  deleteUser(id: string | undefined) {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        if (res.code === 200) {
          this.alertService.showAlert('Success', res.msg, 'success');
          this.getUserList();
        }
      },
      (err) => {
        this.alertService.showAlert('Error', 'Failed to delete user', 'error');
      }
    );
  }
}
