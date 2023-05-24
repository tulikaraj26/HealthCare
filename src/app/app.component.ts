import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HealthCare';

  isUserLogged: boolean = false;

  constructor(private authApi: AuthService){}

  ngOnInit(){
    this.isUserLogged = this.authApi.isUserLoggedIn();
  }

}
