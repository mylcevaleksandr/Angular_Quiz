import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  link:string=''
  constructor(private router: Router, private authServise: AuthService) {
  }

  ngOnInit() {
    this.link=this.authServise.getLoggedIn()?'/choice':'/signup';
  }
}
