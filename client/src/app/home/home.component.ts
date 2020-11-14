import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model: any = {}

  constructor(private accountService: AccountService,
              private router: Router, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.accountService.currentUser$) {this.router.navigateByUrl('/companies');}
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/companies');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

}
