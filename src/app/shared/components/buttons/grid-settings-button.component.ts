import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'src/app/core/services/utility.service';
import { GridSettingsComponent } from '../master-grid/grid-settings/grid-settings.component';
import { UserGridSettingModel } from '../../models/user-grid-settings-model';
import { GridComponent, Column  } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'grid-settings-button',
  template: `
    <div class="badge badge-font-icon badge-blue ml-2 mr-2 cursor-pointer" (click)="onClick()">
      <i class="las la-cog"></i>
    </div>
  `
})
export class GridSettingsButtonComponent implements OnInit {
  @Input() screenCode: number;

  constructor(private dialog: NgbModal, private grid: GridComponent, private utilityService: UtilityService) {}

  ngOnInit() {
    if (!this.screenCode) {
      throw new Error('Please provide screencode for grid settings button to work properly.');
    }

    this.loadData();
  }

  onClick() {
    const data = {
      grid: this.grid,
      screenCode: this.screenCode
    };

    const dialogRef = this.dialog.open(GridSettingsComponent, { windowClass: 'white-modal modal-medium' });
    dialogRef.componentInstance.data = data;
    dialogRef.result.then((res) => {
      if (res) {
        this.applyChanges(res);
      }
    });
  }

  private loadData() {
    this.utilityService.data.get<UserGridSettingModel[]>(`UserGridSetting/${this.screenCode}`).subscribe((res) => {
      this.applyChanges(res);
    });
  }

  private applyChanges(items: UserGridSettingModel[]) {
    this.grid.columns.forEach((t) => {
      if (t.field) {
        const saved = items.find((s) => {
          return s.columnField === t.field;
        });

        if (saved) {
          t.headerText = saved.columnTitle;
          t.visible = saved.isColumnVisible;
          if (saved.columnWidth > 0) {
            t.width = saved.columnWidth;
          } else {
            t.width = null;
          }
        }
      }
    });
    this.grid.refreshColumns();
  }
}
