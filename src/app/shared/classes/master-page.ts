import { BaseApiService } from 'src/app/core/services/base-api.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { MasterGridConfig, MasterGridComponent } from '../components/master-grid/master-grid.component';
import { FormGroup } from '@angular/forms';
import { ViewChild, Input, Directive } from '@angular/core';
import { DynamicComponent } from 'src/app/layout/dynamic-loading/dynamic-loading.models';
@Directive()
export abstract class MasterPage<T> extends Destroyer implements DynamicComponent {
  id: number;
  form: FormGroup;
  gridConfig: MasterGridConfig;
  gridConfig1: MasterGridConfig;
  
  showDetails: boolean;
  @Input() data: any;
  @ViewChild('grid') grid: MasterGridComponent;
  constructor(protected service: BaseApiService<T>) {
    super();
  }

  onAdd(): void {
    this.form.reset();
    this.id = 0;
    this.showDetails = true;
  }

  onDelete(id: number): void {
    this.service.delete(id).subscribe((res) => {
      this.grid.reloadData();
    });
  }

  onBack(): void {
    this.showDetails = false;
  }
}
