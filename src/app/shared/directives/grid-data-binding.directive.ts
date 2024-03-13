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

      });
    } else {
      this.serviceSubscription = this.utilityService.data.get<any[]>(this.gridDataBinding, isDeleted).subscribe((result) => {
        
        this.gridData = result;
     
      });
    }
  }
  
  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

 
}
@Directive()
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
