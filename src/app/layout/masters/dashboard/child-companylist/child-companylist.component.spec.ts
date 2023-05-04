import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCompanylistComponent } from './child-companylist.component';

describe('ChildCompanylistComponent', () => {
  let component: ChildCompanylistComponent;
  let fixture: ComponentFixture<ChildCompanylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildCompanylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCompanylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
