import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-force-logout',
  templateUrl: './force-logout.component.html',
  styleUrls: ['./force-logout.component.scss']
})
export class ForceLogoutComponent implements OnInit {
  constructor(private utils: UtilityService, private router: Router) {}

  ngOnInit(): void {
    this.utils.storage.clear();
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }
}
