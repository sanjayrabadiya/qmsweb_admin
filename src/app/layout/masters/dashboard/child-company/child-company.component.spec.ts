import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCompanyComponent } from './child-company.component';

describe('ChildCompanyComponent', () => {
  let component: ChildCompanyComponent;
  let fixture: ComponentFixture<ChildCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
