import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing';
import { DateTimeFormat } from './shared/pipes/dateFormatTime.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule
           ,BrowserAnimationsModule         
           ,CoreModule
           ,AppRoutingModule          
           ,HammerModule          
          ],
  bootstrap: [AppComponent],
  providers: [DateTimeFormat]
})
export class AppModule { }
