import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  userName = '';

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.auth.getUser$().subscribe(
      userData => {
        if (userData) {
          console.log(userData);
          this.userName = userData.name;
        }
        // TODO: fix need to reload page to get user name bug
        /*
        else {
          console.log("no user data received");
        }
        */
      }
    );
  }

}
