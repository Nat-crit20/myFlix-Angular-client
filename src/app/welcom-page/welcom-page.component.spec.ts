import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomPageComponent } from './welcom-page.component';

describe('WelcomPageComponent', () => {
  let component: WelcomPageComponent;
  let fixture: ComponentFixture<WelcomPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomPageComponent]
    });
    fixture = TestBed.createComponent(WelcomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
