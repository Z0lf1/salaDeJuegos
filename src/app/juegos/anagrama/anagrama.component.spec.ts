import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagramaComponent } from './anagrama.component';

describe('AnagramaComponent', () => {
  let component: AnagramaComponent;
  let fixture: ComponentFixture<AnagramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnagramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnagramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
