import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoadBalancersComponent } from './load-balancers.component';
import { DebugElement } from '@angular/core';

describe('LoadBalancersComponent', () => {
  let component: LoadBalancersComponent;
  let fixture: ComponentFixture<LoadBalancersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ LoadBalancersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadBalancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain component title', () => {
    const componentDoc: DebugElement = fixture.debugElement;
    const componentElem = componentDoc.nativeElement;
    const contentValue = componentElem.querySelector('h3');
    expect(contentValue.textContent).toContain('Load Balancers');
  });
});
