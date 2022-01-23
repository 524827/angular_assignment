import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showAlert(heading: string, message: string, state: SweetAlertIcon) {
    Swal.fire(heading, message, state);
  }
}
