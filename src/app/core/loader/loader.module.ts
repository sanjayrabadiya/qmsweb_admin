import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderComponent } from './loader.component';
import { LoaderInterceptor } from './loader.interceptor';
import { LoadOnce } from '../utils/load-once';
import { LoaderService } from './loader.service';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule],
  exports: [LoaderComponent],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class LoaderModule extends LoadOnce {
  constructor(@Optional() @SkipSelf() parentModule: LoaderModule) {
    super(parentModule);
  }
}
