import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelJogadorComponent } from './painel-jogador.component';

describe('PainelJogadorComponent', () => {
  let component: PainelJogadorComponent;
  let fixture: ComponentFixture<PainelJogadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelJogadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelJogadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
