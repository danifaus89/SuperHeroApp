import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';


describe('HeroesService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    injector: getTestBed();
    httpMock = injector.get(HttpClientTestingModule);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: HeroesService = TestBed.get(HeroesService);
    expect(service).toBeTruthy();
  });

  it('should have getHeroes function', () => {
    const service: HeroesService = TestBed.get(HeroesService);
    expect(service.getHeroes).toBeTruthy();
  });

  it('should have getHero function', () => {
    const service: HeroesService = TestBed.get(HeroesService);
    expect(service.getHero).toBeTruthy();
  });

  it('should have insertHeroe function', () => {
    const service: HeroesService = TestBed.get(HeroesService);
    expect(service.insertHeroe).toBeTruthy();
  });

  it('should have deleteHeroe function', () => {
    const service: HeroesService = TestBed.get(HeroesService);
    expect(service.deleteHeroe).toBeTruthy();
  });

  it('should have updateHeroe function', () => {
    const service: HeroesService = TestBed.get(HeroesService);
    expect(service.updateHeroe).toBeTruthy();
  });

  it('should have searchHeroes function', () => {
    const service: HeroesService = TestBed.get(HeroesService);
    expect(service.searchHeroes).toBeTruthy();
  });
});
