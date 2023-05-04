import { StorageService } from 'src/app/core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-already-loggedin',
  templateUrl: './already-loggedin.component.html',
  styleUrls: ['./already-loggedin.component.scss']
})
export class AlreadyLoggedinComponent extends Destroyer implements OnInit {
  user = '';
  constructor(private route: ActivatedRoute, private authService: AuthService, private storage: StorageService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.subs = this.route.paramMap.subscribe((params) => {
      this.user = params.get('user');
    });
  }

  logoutAllDevices() {
    this.subs = this.authService.logOutFromEveryWhere(this.user).subscribe((res) => {
      this.storage.clear();
      // this.router.navigate(['/auth']);
    });
  }
}
