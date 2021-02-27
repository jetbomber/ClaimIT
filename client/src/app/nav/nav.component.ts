import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  pdfUrl: string;
  baseUrl = environment.apiUrl;

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.pdfUrl = this.baseUrl + 'pdf'; 
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
