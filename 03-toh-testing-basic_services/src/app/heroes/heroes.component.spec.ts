import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';

const mockHeroes = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
];

const mockHeroService = {
  getHeroes: () => of([]),
  addHero: () => {},
  delete: () => {},
};

describe('HeroesComponent: Solution', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    heroService = fixture.debugElement.injector.get(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('#getHeroes', () => {
    it("should assign the heroes' list to the variable (using async) ", async(() => {
      //Arreange
      spyOn(heroService, 'getHeroes').and.returnValue(of(mockHeroes));

      //Act
      component.getHeroes();

      //Asserts
      fixture.whenStable().then(() => {
        expect(component.heroes).toBe(mockHeroes);
      });
    }));

    it(
      "should assign the heroes' list to the variable (using fakeAsync) ",
      fakeAsync(() => {
        //Arreange
        spyOn(heroService, 'getHeroes').and.returnValue(of(mockHeroes));

        //Act
        component.getHeroes();

        flush(); // "flushes" asynchronous tasks

        //Asserts
        expect(component.heroes).toBe(mockHeroes);
      }),
    );
  });

  describe('#add', () => {
    it('should return undefined if name is empty ', async(() => {
      //Arreange
      const name = '';

      //Act
      const result = component.add(name);

      //Asserts
      expect(result).toBe(undefined);
    }));

    it(
      'should add an hero ',
      fakeAsync(() => {
        //Arreange
        const hero = { id: 50, name: 'Carlos Caballero' };
        spyOn(heroService, 'addHero').and.returnValue(of(hero));

        //Act
        component.add(hero.name);

        flush(); // "flushes" asynchronous tasks

        //Asserts
        expect(component.heroes.pop()).toBe(hero);
      }),
    );
  });
});
