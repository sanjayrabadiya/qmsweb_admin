import { Destroyer } from 'src/app/core/utils/destroyer';
import { Component, OnInit, Input } from '@angular/core';
import { UserGridSettingModel } from 'src/app/shared/models/user-grid-settings-model';
import { UtilityService } from 'src/app/core/services/utility.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Column } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-grid-settings',
  templateUrl: './grid-settings.component.html'
})
export class GridSettingsComponent extends Destroyer implements OnInit {
  @Input() data: any;
  items: UserGridSettingModel[];
  constructor(private utils: UtilityService, private dialogRef: NgbActiveModal) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.utils.data.get<UserGridSettingModel[]>(`UserGridSetting/${this.data.screenCode}`).subscribe((res) => {
      this.prepareItemList(res);
    });
  }

  private prepareItemList(saved: UserGridSettingModel[]) {
    this.items = [];
     this.data.grid.columnModel.forEach((t: Column) => {
      if (t.field != "deletedByUser" && t.field != "deletedDate") {
        if (t.field) {
          const existing = saved.find((s) => {
            return s.columnField === t.field;
          });

          if (existing) {
            this.items.push(existing);
          } else {
            this.items.push({
              id: 0,
              screenCode: this.data.screenCode,
              columnField: t.field,
              columnTitle: t.headerText,
              isColumnVisible: true
            });
          }
        }
      }
    });
  }

  save() {
    this.utils.data.post('UserGridSetting', this.items).subscribe((res) => {
      this.dialogRef.close(this.items);
    });
  }

  isInvalid(): boolean {
    const invalid =
      !this.items ||
      this.items.some((t) => {
        return !t.columnTitle;
      });

    return invalid;
  }

  close() {
    this.dialogRef.close(null);
  }
}
