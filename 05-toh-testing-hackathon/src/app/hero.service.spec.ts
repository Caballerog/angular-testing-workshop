import { TestBed, inject, fakeAsync, flush } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService: Solution', () => {
  let heroService: HeroService;
  let messageService: MessageService;
  let httpService: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        {
          provide: HttpClient,
          useValue: {
            get: {},
          },
        },
        {
          provide: MessageService,
          useValue: {
            add: {},
          },
        },
      ],
    });
  });

  beforeEach(inject(
    [HeroService, HttpClient, MessageService],
    (_heroService: HeroService, _httpService: HttpClient, _messageService: MessageService) => {
      heroService = _heroService;
      httpService = _httpService;
      messageService = _messageService;
    },
  ));

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getHeroes', () => {
    it('should return heroes from backend getHeroes', () => {
      const heroesUrl = 'api/heroes';
      const message = 'HeroService: fetched heroes';
      spyOn(httpService, 'get').and.returnValue(of(true));
      spyOn(messageService, 'add');

      heroService.getHeroes().subscribe();

      expect(httpService.get).toHaveBeenCalledWith(heroesUrl);
      expect(messageService.add).toHaveBeenCalledWith(message);
    });
    it('should catchError when an error is provoked from backend ', () => {
      const heroesUrl = 'api/heroes';
      const message = 'HeroService: getHeroes failed: undefined';
      spyOn(httpService, 'get').and.returnValue(_throw(3));
      spyOn(messageService, 'add');

      heroService.getHeroes().subscribe();

      expect(httpService.get).toHaveBeenCalledWith(heroesUrl);
      expect(messageService.add).toHaveBeenCalledWith(message);
    });
  });
});
