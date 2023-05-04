import { Directive, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/core/services/utility.service';

@Directive({
  selector: '[gridDataBinding]'
})
export class GridDataBindingDirective implements OnInit, OnDestroy {
  private serviceSubscription: Subscription;
  private gridData: any[] = [];
  @Input() gridDataBinding: string;
  @Input() searchObject: Object;
  _globalFilter: string;

  @Input() set globalFilter(value: string) {
    this._globalFilter = value;
  //  this.rebind();
  }
  constructor(private utilityService: UtilityService) {
  }
  public ngOnInit(): void {
    this.reloadData();
  }
  public reloadData(isDeleted?: boolean): void {
    if (this.searchObject) {
      this.serviceSubscription = this.utilityService.data.post<any[]>(this.gridDataBinding, this.searchObject).subscribe((result) => {
        this.gridData = result;
     //   this.rebind();
      });
    } else {
      this.serviceSubscription = this.utilityService.data.get<any[]>(this.gridDataBinding, isDeleted).subscribe((result) => {
        
        this.gridData = result;
     //   this.rebind();
      });
    }
  }
  // private loadData(): void {
  //   this.grid.isInitialLoad = false;
  //   this.grid.data = process(this.filterArray(this.gridData, this._globalFilter), this.state);
  //   this.notifyDataChange();
  // }
  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  // public rebind(): void {
  //   this.grid.loading = true;
  //   this.loadData();
  // }
  // private getGridColumns(): string[] {
  //   const rtnObj = [];
  //   this.grid.getVisibleColumns.foreach((item: Column) => {
  //     if (item.field) {
  //       // if (item.field !== 'id') {
  //       rtnObj.push(item.field);
  //       // }
  //     }
  //   });
  //   return rtnObj;
  // }

  // private filterArray(items: Array<any>, searchText: string): any {
  //   if (searchText) {
  //     return items.filter((item) => {
  //       const filter = this.getGridColumns(); // Object.keys(item);
  //       return filter.some((key) => {
  //         if (item[key]) {
  //           return item[key].toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  //         } else {
  //           return false;
  //         }
  //       });
  //     });
  //   }
  //   return items;
  // }
}

export class GridDataBinding {
  @ViewChild(GridDataBindingDirective)
  private gridDataBindingDirective: GridDataBindingDirective;
  public globalFilter: string;
  public isDeleted = false;
  public reloadData(): void {
    this.gridDataBindingDirective.reloadData(this.isDeleted ? true : null);
  }
  public onDeleteChange() {
    this.reloadData();
  }
}