import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewConfigComponent } from './brew-config.component';

describe('BrewConfigComponent', () => {
  let component: BrewConfigComponent;
  let fixture: ComponentFixture<BrewConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrewConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
