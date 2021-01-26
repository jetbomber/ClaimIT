import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PopUpMessageService {
  private msgPosition: string = 'toast-center-center';

  constructor(private toastr: ToastrService) { }

  public success(msg: string) {
    this.toastr.success(msg,'',{positionClass : this.msgPosition});
  }

  public error(msg: string, title: string) {
    this.toastr.error(msg,title,{positionClass : this.msgPosition});
  }
}
