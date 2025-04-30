import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromocoesComponent } from './admin-promocoes.component';

describe('AdminPromocoesComponent', () => {
  let component: AdminPromocoesComponent;
  let fixture: ComponentFixture<AdminPromocoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPromocoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPromocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
