import { CurrentUserModel } from './../../../core/models/current-user';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Destroyer } from './../../../core/utils/destroyer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItemModel, MenuEventArgs, MenuComponent, FieldSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../change-password/change-password.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends Destroyer implements OnInit {
  currentUser: CurrentUserModel;
  showRoles = false;
  public menuItems: MenuItemModel[] = [];
  userName: string;
  roleName: string;
  @ViewChild('menu') private menuObj: MenuComponent;


  

  constructor(private utils: UtilityService, private dialog: NgbModal, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.utils.storage.CurrentUser;
    this.userName = this.currentUser.userName;
    this.roleName = this.currentUser.roleName;
    this.menuItems = [
      {
        text: this.userName ,
        items: [
          { text: 'Change Password', iconCss: 'las la-lock' },
          { text: 'Logout', iconCss: 'las la-sign-out-alt' }
        ]
      }
    ];
  }

  logout() {
    this.subs = this.utils.data.get<any>(`login/logout/${this.currentUser.userId}/${this.currentUser.loginReportId}`).subscribe((res) => {
      localStorage.removeItem("currentOpenMenu");
      this.utils.storage.clear();
      this.router.navigate(['/auth']);
    });
  }

  changeRole(roleId: number): void {
    if (this.currentUser.roleId === roleId) {
      return;
    }

    this.showRoles = false;

    const data = {
      UserId: this.currentUser.userId,
      RoleId: roleId,
      UserName: this.currentUser.userName,
      Guid: this.currentUser.roleTokenId
    };

    this.utils.data.post('login/role', data).subscribe((res: CurrentUserModel) => {
      localStorage.removeItem("currentOpenMenu");
      let dashboardComponent: any[] = [];
      dashboardComponent.push({ "componentId": "mnu_dashboard", "title": "Dashboard", "selected": true });
      localStorage.setItem("currentOpenMenu", JSON.stringify(dashboardComponent));

      this.utils.storage.setUserData(res);
      this.currentUser = this.utils.storage.CurrentUser;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/']);
    });
  }

  select(args: MenuEventArgs): void {
    if (args.item.text === 'Logout') this.logout();
    else if (args.item.text === 'Change Password') this.openPasswordChange();
    else if (args.element.id.toString().includes('Role_') === true) this.changeRole(+args.element.id.toString().split('_')[1]);
  }

  openPasswordChange() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.result.then((result) => {
     
    });

  }

  created(): void {
   
  }

}
